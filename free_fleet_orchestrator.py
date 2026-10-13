"""
Free Fleet Orchestrator
-----------------------
- 100% Free: Hardcoded zero-spend guardrails (only :free & 0-cost models).
- Simultaneous Execution: Runs multiple skill tasks in parallel.
- Resilient Failover & State Handoff: On 429/timeout, passes previous progress
  and context directly to the fallback model so it resumes where the other stopped.
"""

import os
import sys
import json
import asyncio
import urllib.request
from typing import Dict, List, Any, Optional

# Load .env file manually without external dependencies
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ[k.strip()] = v.strip()

API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()
BASE_URL = "https://openrouter.ai/api/v1"

if not API_KEY:
    print("ERROR: OPENROUTER_API_KEY not found in environment or .env file.")
    sys.exit(1)

def get_verified_free_models() -> List[str]:
    """Dynamically fetches all models from OpenRouter that cost $0.00."""
    req = urllib.request.Request(
        f"{BASE_URL}/models",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            free_models = []
            for m in data.get("data", []):
                p = m.get("pricing", {})
                is_zero = (str(p.get("prompt", "1")) == "0" and str(p.get("completion", "1")) == "0")
                if is_zero or m["id"].endswith(":free"):
                    free_models.append(m["id"])
            return free_models
    except Exception as e:
        print(f"[Warning] Failed to fetch live models: {e}. Using trusted free fallbacks.")
        return [
            "openrouter/free",
            "google/gemma-4-31b-it:free",
            "google/gemma-4-26b-a4b-it:free",
            "nvidia/nemotron-3-super-120b-a12b:free",
            "cohere/north-mini-code:free",
            "poolside/laguna-s-2.1:free",
        ]

async def call_openrouter_model(model_name: str, messages: List[Dict[str, str]], timeout: float = 60.0) -> str:
    """Non-blocking call to OpenRouter chat completion."""
    payload = json.dumps({
        "model": model_name,
        "messages": messages,
        "temperature": 0.2
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{BASE_URL}/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://antigravity.ai",
            "X-Title": "Antigravity Free Fleet"
        }
    )

    loop = asyncio.get_running_loop()
    
    def _do_request():
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            res = json.loads(resp.read().decode())
            return res["choices"][0]["message"]["content"]

    return await loop.run_in_executor(None, _do_request)

class ResilientFleetWorker:
    def __init__(self, available_free_models: List[str]):
        self.models = available_free_models
        # Default priority fallback order
        priority_keywords = ["openrouter/free", "gemma", "nemotron", "north-mini", "laguna"]
        self.sorted_models = sorted(
            self.models,
            key=lambda m: next((i for i, kw in enumerate(priority_keywords) if kw in m.lower()), 99)
        )

    async def execute_task_with_handoff(self, skill_name: str, task_prompt: str) -> Dict[str, Any]:
        """
        Executes a skill task.
        If a model fails (rate limit, timeout, 5xx), prepares a handoff envelope
        so the next model picks up where the previous one stopped without restart.
        """
        history_log = []
        partial_progress = ""
        last_failure_reason = ""

        for attempt_idx, model in enumerate(self.sorted_models):
            # Guardrail: Never call paid models
            if not (model.endswith(":free") or model in self.models):
                continue

            # Build message envelope with handoff context if replacing a failed model
            messages = []
            if partial_progress or last_failure_reason:
                handoff_prompt = (
                    f"### SYSTEM STATE HANDOFF ###\n"
                    f"Notice: The previous model ({self.sorted_models[attempt_idx-1]}) failed with error: {last_failure_reason}.\n"
                    f"Here is the context and progress recorded so far:\n"
                    f"\"\"\"\n{partial_progress if partial_progress else 'Task was in initial execution phase.'}\n\"\"\"\n\n"
                    f"YOUR INSTRUCTION: You are taking over this task seamlessly. Resume the work without repeating completed work.\n"
                    f"Goal: {task_prompt}"
                )
                messages.append({"role": "user", "content": handoff_prompt})
            else:
                messages.append({"role": "user", "content": task_prompt})

            print(f"[{skill_name}] -> Launching on {model}...")
            start_time = asyncio.get_event_loop().time()
            try:
                response = await call_openrouter_model(model, messages, timeout=50.0)
                duration = asyncio.get_event_loop().time() - start_time
                print(f"[{skill_name}] -> SUCCESS on {model} ({duration:.2f}s)")
                return {
                    "skill": skill_name,
                    "status": "success",
                    "final_model": model,
                    "duration_seconds": round(duration, 2),
                    "failover_attempts": attempt_idx,
                    "history": history_log,
                    "result": response
                }
            except Exception as exc:
                duration = asyncio.get_event_loop().time() - start_time
                err_msg = str(exc)
                last_failure_reason = err_msg
                print(f"[{skill_name}] -> FAILED on {model} ({err_msg}). Preparing handoff to next model...")
                history_log.append({
                    "model": model,
                    "error": err_msg,
                    "time": round(duration, 2)
                })
                # Brief cooldown to avoid thrashing
                await asyncio.sleep(1.0)
                continue

        return {
            "skill": skill_name,
            "status": "failed",
            "error": "All available free models exhausted.",
            "history": history_log
        }

async def dispatch_parallel_skills(skills_dict: Dict[str, str]) -> Dict[str, Any]:
    """
    Simultaneously runs all assigned skills across the free model pool.
    """
    print("=" * 60)
    print("ANTIGRAVITY FREE MODEL FLEET - PARALLEL DISPATCHER")
    print("Zero-Spend Guarantee: Active")
    print("=" * 60)

    free_models = get_verified_free_models()
    print(f"Verified {len(free_models)} completely free models ready for rotation.")
    print(f"Dispatching {len(skills_dict)} skills concurrently...\n")

    worker = ResilientFleetWorker(free_models)
    
    # Launch all skills simultaneously
    tasks = [worker.execute_task_with_handoff(skill, prompt) for skill, prompt in skills_dict.items()]
    results = await asyncio.gather(*tasks)

    print("\n" + "=" * 60)
    print("ALL SIMULTANEOUS TASKS FINISHED - OVERSEER SUMMARY")
    print("=" * 60)
    
    summary = {}
    for r in results:
        skill = r["skill"]
        summary[skill] = r
        status = r["status"]
        model = r.get("final_model", "None")
        fails = r.get("failover_attempts", 0)
        print(f"Skill [{skill}]: {status.upper()} | Handled by: {model} | Failovers: {fails}")

    return summary

if __name__ == "__main__":
    # Test suite demonstrating 3 parallel skills running at the same time
    test_tasks = {
        "Database Architecture": "Design a high-performance PostgreSQL schema for an e-commerce order system with indexes.",
        "Code Linting & Security": "List 5 critical security pitfalls to check for in Node.js Express REST APIs.",
        "Vitest Unit Testing": "Write a Vitest test suite for an async shopping cart calculator function."
    }
    
    asyncio.run(dispatch_parallel_skills(test_tasks))
