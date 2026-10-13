import fs from 'fs';
import path from 'path';

function getOpenRouterApiKey() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('OPENROUTER_API_KEY=')) {
        return line.trim().split('=', 2)[1].replace(/["']/g, '');
      }
    }
  }
  return process.env.OPENROUTER_API_KEY || '';
}

async function callModel(model, name, prompt, apiKey) {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Council of Brothers Swarm'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const d = await res.json();
    return {
      name,
      model,
      response: d.choices?.[0]?.message?.content || d.error?.message || 'Approved'
    };
  } catch(e) {
    return { name, model, response: 'Fallback: ' + e.message };
  }
}

async function runSimultaneousCouncil() {
  const apiKey = getOpenRouterApiKey();
  console.log('🏛️ Convening Expanded Council of Brothers simultaneously...\n');

  const pTaste = `You are Brother 4 (Taste & Ultra-Luxury Director). The user complains: "the home page banner no need form right there its like too sale forcing into the face so come up with different ideas for homepage banner, put together nice elegant looking homepage banner".
Give Brother 1 and Brother 9 the 2 golden directives for an effortless, billionaire-grade hero that seduces without aggressive sales popups or embedded lead forms.`;

  const pUIUX = `You are Brother 1 (Senior UI/UX Craftsman).
Design a tranquil, architectural hero banner that replaces the aggressive booking form. Propose:
1. Editorial visual hierarchy (Monumental typography, breathing room)
2. Interactive private estate portal preview (Interactive card deck with high-res photography, RERA badges, key metrics)
3. Subtle, discreet VIP access triggers (Private Treaty Dossier, 3D Spatial Studio walkthrough link).`;

  const pBrand = `You are Brother 8 (Prestige Brand & Icon Designer).
The current favicon is a cheap, generic yellow polygon. Design an ultra-refined SVG icon for "AURA PRIVÉ":
A geometric architectural pavilion / sovereign diamond monogram with delicate interlocking lines in brushed 24k gold (#D4AF37) and deep obsidian (#0B0D13). Return the exact SVG concept.`;

  const pSpatial = `You are Brother 7 (3D Spatial & Coordinates Engineer).
The user shared screenshots where room fly-to coordinates in ThreeVillaViewer ("Architectural Arrival Court" and "Cantilevered Master Wing") point to slightly off angles, and the info card text had yellow highlighting or was misaligned with the bottom HUD bar.
Give exact camera positioning vectors (camPos, camLook) for the 3D villa model to frame each room with precision, and explain how the modal should be positioned so it never overlaps the bottom HUD controls.`;

  const results = await Promise.all([
    callModel('cohere/north-mini-code:free', 'Brother 4 (Taste Director)', pTaste, apiKey),
    callModel('nvidia/nemotron-3.5-lightning:free', 'Brother 1 (UI/UX Craftsman)', pUIUX, apiKey),
    callModel('liquid/lfm-2.5-2.6b:free', 'Brother 8 (Prestige Brand & Icon)', pBrand, apiKey),
    callModel('liquid/lfm-2.5-2.6b:free', 'Brother 7 (3D Spatial Engineer)', pSpatial, apiKey)
  ]);

  for (const r of results) {
    console.log(`==================================================================`);
    console.log(`👑 ${r.name} [${r.model}]`);
    console.log(`==================================================================`);
    console.log(r.response);
    console.log('\n');
  }
}

runSimultaneousCouncil();
