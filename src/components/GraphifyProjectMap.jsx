import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, Cpu, Users, Layers, ShieldCheck, Box, Sparkles, 
  ExternalLink, ArrowRight, Activity, Database, CheckCircle2, 
  FileCode, Workflow, ChevronRight, Eye, RefreshCw, ZoomIn, ZoomOut,
  Brain, Clock, GitCommit, GitBranch, History, Compass
} from 'lucide-react';
import councilGraphifyData from '../memory/council_graphify.json';
import councilClaudeMemData from '../memory/council_claude_mem.json';

export default function GraphifyProjectMap() {
  const [activeTab, setActiveTab] = useState('memory_graph'); // 'memory_graph' | 'brothers_graph' | 'all_agents' | 'architecture' | 'claude_mem_log'
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('all');
  const canvasRef = useRef(null);

  // ==========================================
  // MODE 1: CLAUDE-MEM PERSISTENT MEMORY GRAPH
  // ==========================================
  const memoryGraphNodes = [
    { 
      id: 'core_mem', 
      label: 'Claude-Mem Project Core', 
      sublabel: 'Persistent Store', 
      type: 'core', 
      x: 600, 
      y: 70, 
      color: '#ec4899', 
      radius: 26, 
      desc: 'Central cross-session memory hub persisting architectural decisions, visual rules, and brother observations across all LLM sessions.' 
    },
    { 
      id: 'mem_domain_taste', 
      label: 'Memory: Quiet Luxury', 
      sublabel: 'Materiality Decisions', 
      type: 'domain', 
      x: 200, 
      y: 190, 
      color: '#d97706', 
      radius: 20, 
      desc: 'Durable consensus: travertine sundecks, nero marquina granite, removal of fake 3D box meshes.' 
    },
    { 
      id: 'mem_domain_spatial', 
      label: 'Memory: 3D Spatial Framing', 
      sublabel: 'Camera & Lighting Vectors', 
      type: 'domain', 
      x: 470, 
      y: 190, 
      color: '#10b981', 
      radius: 20, 
      desc: 'Durable consensus: Parterre Gardens framing (0, 14, -18) and Fountain Court (camPos: -6.5, 4.2, 10.5).' 
    },
    { 
      id: 'mem_domain_motion', 
      label: 'Memory: 2026 Kinetic Rules', 
      sublabel: 'Motion Physics Specs', 
      type: 'domain', 
      x: 730, 
      y: 190, 
      color: '#06b6d4', 
      radius: 20, 
      desc: 'Durable consensus: Eliminate 2002 perspective tilt; enforce tactile micro-spring press (scale: 0.985) and liquid specular sheen.' 
    },
    { 
      id: 'mem_domain_qa', 
      label: 'Memory: E2E Verification', 
      sublabel: 'Playwright Pass Ledger', 
      type: 'domain', 
      x: 1000, 
      y: 190, 
      color: '#3b82f6', 
      radius: 20, 
      desc: 'Durable consensus: 5/5 Playwright tests passing, 0 console errors, mobile viewport verified without horizontal overflow.' 
    },
    { 
      id: 'obs_1', 
      label: 'Obs #1: Materiality Rule', 
      sublabel: 'Bro 4A/4B • 14:49', 
      type: 'observation', 
      x: 120, 
      y: 330, 
      color: '#fbbf24', 
      radius: 14, 
      desc: 'Synthesized quiet luxury materiality: travertine sundecks and nero marquina basins without clunky UI buttons.' 
    },
    { 
      id: 'obs_2', 
      label: 'Obs #2: Solar & Spatial Rule', 
      sublabel: 'Bro 7A/7B • 14:50', 
      type: 'observation', 
      x: 280, 
      y: 360, 
      color: '#6ee7b7', 
      radius: 14, 
      desc: 'Validated exact camera vectors with solar shadow casting for real estate perspectives.' 
    },
    { 
      id: 'obs_3', 
      label: 'Obs #3: HUD Hierarchy', 
      sublabel: 'Bro 1A/1B • 14:50', 
      type: 'observation', 
      x: 420, 
      y: 330, 
      color: '#c4b5fd', 
      radius: 14, 
      desc: 'Ensured clean 3-tier vertical HUD hierarchy with 0% viewport obstruction.' 
    },
    { 
      id: 'obs_4', 
      label: 'Obs #4: Playwright Baseline', 
      sublabel: 'Bro 5A/5B • 14:50', 
      type: 'observation', 
      x: 560, 
      y: 360, 
      color: '#93c5fd', 
      radius: 14, 
      desc: 'Playwright E2E verification passed: 5/5 tests, 0 console errors.' 
    },
    { 
      id: 'obs_5', 
      label: 'Obs #5: Box Mesh Purge', 
      sublabel: 'Bro 4A/4B • 15:03', 
      type: 'observation', 
      x: 700, 
      y: 330, 
      color: '#fbbf24', 
      radius: 14, 
      desc: 'Purged artificial procedural box meshes; restored pristine authentic 1:1 scale estate geometry.' 
    },
    { 
      id: 'obs_6', 
      label: 'Obs #6: Camera Vectors P1-P4', 
      sublabel: 'Bro 7A/7B • 15:04', 
      type: 'observation', 
      x: 840, 
      y: 360, 
      color: '#6ee7b7', 
      radius: 14, 
      desc: 'Delivered exact camera pitch and yaw vectors for Parterre Gardens and Central Fountain Court.' 
    },
    { 
      id: 'obs_7', 
      label: 'Obs #7: Freehold RERA Title', 
      sublabel: 'Bro 3A/3B • 15:04', 
      type: 'observation', 
      x: 960, 
      y: 330, 
      color: '#f472b6', 
      radius: 14, 
      desc: 'Verified 100% Freehold Title status and tabular lining-nums currency formatting.' 
    },
    { 
      id: 'obs_8', 
      label: 'Obs #8: Final QA Certified', 
      sublabel: 'Bro 5A/5B • 15:04', 
      type: 'observation', 
      x: 1080, 
      y: 360, 
      color: '#93c5fd', 
      radius: 14, 
      desc: 'Brother 5 verified live site: all 5 tests passed, production bundle built cleanly in 6.85s.' 
    },
    { 
      id: 'target_mem_json', 
      label: 'council_claude_mem.json', 
      sublabel: 'Persistent File', 
      type: 'file', 
      x: 450, 
      y: 490, 
      color: '#ffffff', 
      radius: 16, 
      desc: 'Physical JSON file storing persistent cross-session observations and consensus records on disk.' 
    },
    { 
      id: 'target_graph_json', 
      label: 'council_graphify.json', 
      sublabel: 'Knowledge Store', 
      type: 'file', 
      x: 750, 
      y: 490, 
      color: '#ffffff', 
      radius: 16, 
      desc: 'Directed graph storage mapping nodes, relations, weights, and timestamps.' 
    }
  ];

  const memoryGraphEdges = [
    { source: 'core_mem', target: 'mem_domain_taste', type: 'INDEXES_DOMAIN' },
    { source: 'core_mem', target: 'mem_domain_spatial', type: 'INDEXES_DOMAIN' },
    { source: 'core_mem', target: 'mem_domain_motion', type: 'INDEXES_DOMAIN' },
    { source: 'core_mem', target: 'mem_domain_qa', type: 'INDEXES_DOMAIN' },
    { source: 'mem_domain_taste', target: 'obs_1', type: 'RECORDS' },
    { source: 'mem_domain_taste', target: 'obs_5', type: 'RECORDS' },
    { source: 'mem_domain_spatial', target: 'obs_2', type: 'RECORDS' },
    { source: 'mem_domain_spatial', target: 'obs_6', type: 'RECORDS' },
    { source: 'mem_domain_motion', target: 'obs_3', type: 'RECORDS' },
    { source: 'mem_domain_motion', target: 'obs_7', type: 'RECORDS' },
    { source: 'mem_domain_qa', target: 'obs_4', type: 'RECORDS' },
    { source: 'mem_domain_qa', target: 'obs_8', type: 'RECORDS' },
    { source: 'obs_1', target: 'obs_5', type: 'EVOLVED_TO' },
    { source: 'obs_2', target: 'obs_6', type: 'EVOLVED_TO' },
    { source: 'obs_4', target: 'obs_8', type: 'CONFIRMED_BY' },
    { source: 'obs_1', target: 'target_mem_json', type: 'PERSISTS_TO' },
    { source: 'obs_5', target: 'target_mem_json', type: 'PERSISTS_TO' },
    { source: 'obs_6', target: 'target_graph_json', type: 'PERSISTS_TO' },
    { source: 'obs_8', target: 'target_graph_json', type: 'PERSISTS_TO' },
    { source: 'core_mem', target: 'target_graph_json', type: 'STRUCTURES' }
  ];

  // ==========================================
  // MODE 2: COUNCIL OF BROTHERS SWARM HIERARCHY
  // ==========================================
  const brotherGraphNodes = [
    { id: 'antigravity', label: 'Antigravity (Parent Flash)', type: 'supervisor', x: 600, y: 50, color: '#f59e0b', radius: 24, desc: 'Master Supervisor running Flash Gemini overseeing all Brother agents & skills' },
    { id: 'taste', label: 'Taste', type: 'skill', x: 150, y: 150, color: '#d97706', radius: 18, desc: 'Ultra-luxury aesthetic direction, travertine sundecks & zero-glitz palette' },
    { id: 'motion', label: 'Kinetic Motion', type: 'skill', x: 330, y: 150, color: '#06b6d4', radius: 18, desc: 'Liquid titanium fluid sheen, tactile micro-spring press (scale 0.985)' },
    { id: 'spatial3d', label: '3D Spatial Twin', type: 'skill', x: 510, y: 150, color: '#10b981', radius: 18, desc: 'Three.js WebGL rendering, 6 AM-7 PM solar trajectory, cadastral caliper' },
    { id: 'uiux', label: 'UI/UX Design', type: 'skill', x: 690, y: 150, color: '#8b5cf6', radius: 18, desc: '3-tier non-blocking HUD, responsive viewport, clean camera flight' },
    { id: 'rera', label: 'RERA Legal', type: 'skill', x: 870, y: 150, color: '#ec4899', radius: 18, desc: '100% Freehold Title status, RERA badges, ₹ Crores lining-nums' },
    { id: 'e2e', label: 'Playwright QA', type: 'skill', x: 1040, y: 150, color: '#3b82f6', radius: 18, desc: 'Headless Chromium browser testing, WebGL canvas check, zero overflow' },
    { id: 'bro4a', label: 'Bro 4A (Cohere)', type: 'brother', x: 100, y: 265, color: '#fbbf24', radius: 13, model: 'cohere/north-mini-code:free', skill: 'taste' },
    { id: 'bro4b', label: 'Bro 4B (Nemotron)', type: 'brother', x: 190, y: 310, color: '#fbbf24', radius: 13, model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', skill: 'taste' },
    { id: 'bro2a', label: 'Bro 2A (Liquid)', type: 'brother', x: 280, y: 265, color: '#67e8f9', radius: 13, model: 'liquid/lfm-2.5-2.6b:free', skill: 'motion' },
    { id: 'bro2b', label: 'Bro 2B (Nemotron)', type: 'brother', x: 370, y: 310, color: '#67e8f9', radius: 13, model: 'nvidia/nemotron-3.5-lightning:free', skill: 'motion' },
    { id: 'bro7a', label: 'Bro 7A (120B Omni)', type: 'brother', x: 460, y: 265, color: '#6ee7b7', radius: 13, model: 'nvidia/nemotron-3-super-120b-a12b:free', skill: 'spatial3d' },
    { id: 'bro7b', label: 'Bro 7B (Liquid)', type: 'brother', x: 550, y: 310, color: '#6ee7b7', radius: 13, model: 'liquid/lfm-2.5-2.6b:free', skill: 'spatial3d' },
    { id: 'bro1a', label: 'Bro 1A (Cohere)', type: 'brother', x: 640, y: 265, color: '#c4b5fd', radius: 13, model: 'cohere/north-mini-code:free', skill: 'uiux' },
    { id: 'bro1b', label: 'Bro 1B (Nemotron)', type: 'brother', x: 730, y: 310, color: '#c4b5fd', radius: 13, model: 'nvidia/nemotron-3.5-lightning:free', skill: 'uiux' },
    { id: 'bro3a', label: 'Bro 3A (RERA)', type: 'brother', x: 820, y: 265, color: '#f472b6', radius: 13, model: 'System Engine', skill: 'rera' },
    { id: 'bro3b', label: 'Bro 3B (Valuation)', type: 'brother', x: 910, y: 310, color: '#f472b6', radius: 13, model: 'System Engine', skill: 'rera' },
    { id: 'bro5a', label: 'Bro 5A (Desktop)', type: 'brother', x: 990, y: 265, color: '#93c5fd', radius: 13, model: 'Chromium Engine', skill: 'e2e' },
    { id: 'bro5b', label: 'Bro 5B (Mobile)', type: 'brother', x: 1080, y: 310, color: '#93c5fd', radius: 13, model: 'Chromium Engine', skill: 'e2e' },
    { id: 'comp_viewer', label: 'ThreeVillaViewer.jsx', type: 'component', x: 300, y: 440, color: '#e2e8f0', radius: 16, desc: 'PBR 3D WebGL Villa & Mansion engine with solar hour illumination' },
    { id: 'comp_estates', label: 'EstatesShowcase.jsx', type: 'component', x: 500, y: 440, color: '#e2e8f0', radius: 16, desc: 'Luxury portfolio cards with ₹145 Cr Worli & ₹48.5 Cr Goa estates' },
    { id: 'comp_motion', label: 'LiquidMotion.jsx', type: 'component', x: 700, y: 440, color: '#e2e8f0', radius: 16, desc: 'Physical button feedback & fluid specular lighting sheen' },
    { id: 'comp_mem', label: 'council_graphify.json', type: 'component', x: 900, y: 440, color: '#e2e8f0', radius: 16, desc: 'Cross-session memory and Graphify directed knowledge store' }
  ];

  const brotherGraphEdges = [
    { source: 'antigravity', target: 'taste', type: 'SUPERVISES' },
    { source: 'antigravity', target: 'motion', type: 'SUPERVISES' },
    { source: 'antigravity', target: 'spatial3d', type: 'SUPERVISES' },
    { source: 'antigravity', target: 'uiux', type: 'SUPERVISES' },
    { source: 'antigravity', target: 'rera', type: 'SUPERVISES' },
    { source: 'antigravity', target: 'e2e', type: 'SUPERVISES' },
    { source: 'bro4a', target: 'taste', type: 'PRACTICES' },
    { source: 'bro4b', target: 'taste', type: 'PRACTICES' },
    { source: 'bro2a', target: 'motion', type: 'PRACTICES' },
    { source: 'bro2b', target: 'motion', type: 'PRACTICES' },
    { source: 'bro7a', target: 'spatial3d', type: 'PRACTICES' },
    { source: 'bro7b', target: 'spatial3d', type: 'PRACTICES' },
    { source: 'bro1a', target: 'uiux', type: 'PRACTICES' },
    { source: 'bro1b', target: 'uiux', type: 'PRACTICES' },
    { source: 'bro3a', target: 'rera', type: 'PRACTICES' },
    { source: 'bro3b', target: 'rera', type: 'PRACTICES' },
    { source: 'bro5a', target: 'e2e', type: 'PRACTICES' },
    { source: 'bro5b', target: 'e2e', type: 'PRACTICES' },
    { source: 'bro4a', target: 'bro4b', type: 'COLLABORATES' },
    { source: 'bro2a', target: 'bro2b', type: 'COLLABORATES' },
    { source: 'bro7a', target: 'bro7b', type: 'COLLABORATES' },
    { source: 'bro1a', target: 'bro1b', type: 'COLLABORATES' },
    { source: 'bro3a', target: 'bro3b', type: 'COLLABORATES' },
    { source: 'bro5a', target: 'bro5b', type: 'COLLABORATES' },
    { source: 'spatial3d', target: 'comp_viewer', type: 'IMPLEMENTS' },
    { source: 'taste', target: 'comp_estates', type: 'IMPLEMENTS' },
    { source: 'motion', target: 'comp_motion', type: 'IMPLEMENTS' },
    { source: 'uiux', target: 'comp_viewer', type: 'IMPLEMENTS' },
    { source: 'e2e', target: 'comp_viewer', type: 'AUDITS' },
    { source: 'rera', target: 'comp_estates', type: 'AUDITS' }
  ];

  // Active Nodes & Edges depending on selected graph mode
  const isMemoryMode = activeTab === 'memory_graph';
  const currentNodes = isMemoryMode ? memoryGraphNodes : brotherGraphNodes;
  const currentEdges = isMemoryMode ? memoryGraphEdges : brotherGraphEdges;

  // Render Canvas
  useEffect(() => {
    if (activeTab !== 'memory_graph' && activeTab !== 'brothers_graph') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Subtle Grid Background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Edges
    currentEdges.forEach((edge) => {
      const src = currentNodes.find(n => n.id === edge.source);
      const tgt = currentNodes.find(n => n.id === edge.target);
      if (!src || !tgt) return;

      const isHighlighted = (hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id)) ||
                            (selectedNode && (selectedNode.id === src.id || selectedNode.id === tgt.id));

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);

      if (isHighlighted) {
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.95)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([]);
      } else if (edge.type === 'COLLABORATES' || edge.type === 'EVOLVED_TO') {
        ctx.strokeStyle = isMemoryMode ? 'rgba(236, 72, 153, 0.45)' : 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw Nodes
    currentNodes.forEach((node) => {
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;

      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 7, 0, Math.PI * 2);
        ctx.fillStyle = isMemoryMode ? 'rgba(236, 72, 153, 0.35)' : 'rgba(212, 175, 55, 0.35)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(0, 0, 0, 0.6)';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.stroke();

      ctx.font = isHovered || isSelected ? 'bold 11px sans-serif' : '10px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + node.radius + 14);

      if (node.sublabel) {
        ctx.font = '8px font-mono, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(node.sublabel, node.x, node.y + node.radius + 24);
      }
    });

  }, [activeTab, selectedNode, hoveredNode]);

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    let found = null;
    for (const node of currentNodes) {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
        found = node;
        break;
      }
    }
    setHoveredNode(found);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    let found = null;
    for (const node of currentNodes) {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
        found = node;
        break;
      }
    }
    setSelectedNode(found);
  };

  // Swarm Cluster data for detailed agent inspect
  const domainClusters = [
    {
      id: 'taste',
      name: 'Ultra-Luxury Aesthetics & Materiality',
      skill: 'taste',
      leadModels: [
        { name: 'Brother 4A', role: 'Aesthetic Visionary', model: 'cohere/north-mini-code:free' },
        { name: 'Brother 4B', role: 'Luxury Materiality Director', model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free' }
      ],
      description: 'Curates Travertine sundecks, flamed Nero Marquina granite, 2026 quiet luxury editorial hierarchy, and bespoke architectural typographies.'
    },
    {
      id: 'motion',
      name: '2026 Kinetic Motion & Tactile Physics',
      skill: 'awesome-design',
      leadModels: [
        { name: 'Brother 2A', role: 'Micro-Spring Dynamicist', model: 'liquid/lfm-2.5-2.6b:free' },
        { name: 'Brother 2B', role: 'Liquid Titanium Fluid Engineer', model: 'nvidia/nemotron-3.5-lightning:free' }
      ],
      description: 'Tactile micro-spring press (scale(0.985)), fluid specular sheens, and physical button depression.'
    },
    {
      id: 'spatial3d',
      name: '3D Spatial Twin & Astronomical Lighting',
      skill: 'generative_ui',
      leadModels: [
        { name: 'Brother 7A', role: '3D Spatial Geometry Master', model: 'nvidia/nemotron-3-super-120b-a12b:free' },
        { name: 'Brother 7B', role: 'Solar Dial & Shadow Specialist', model: 'liquid/lfm-2.5-2.6b:free' }
      ],
      description: 'WebGL Three.js engine, 6:00 AM – 7:00 PM dynamic sun trajectory, cadastral caliper grids, and authentic architectural perspectives.'
    },
    {
      id: 'uiux',
      name: 'Editorial UI/UX & Non-Blocking HUD',
      skill: 'component-refactoring',
      leadModels: [
        { name: 'Brother 1A', role: 'Editorial Layout Architect', model: 'cohere/north-mini-code:free' },
        { name: 'Brother 1B', role: 'Ergonomic Navigation Craftsman', model: 'nvidia/nemotron-3.5-lightning:free' }
      ],
      description: 'Clean 3-tier vertical HUD hierarchy, 0% viewport obstruction, smooth camera fly-to tweening with instant drag cancellation.'
    },
    {
      id: 'rera',
      name: 'Legal Title & Valuation Integrity',
      skill: 'credentials',
      leadModels: [
        { name: 'Brother 3A', role: 'RERA Compliance Specialist', model: 'System Engine' },
        { name: 'Brother 3B', role: 'Valuation & Lining Nums Guardian', model: 'System Engine' }
      ],
      description: 'Enforces 100% Freehold Title status, RERA compliance badges, and strict ₹ Crores format with tabular lining-nums typography.'
    },
    {
      id: 'e2e',
      name: 'Playwright Browser Audit & QA',
      skill: 'e2e-tester',
      leadModels: [
        { name: 'Brother 5A', role: 'Playwright Desktop Tester', model: 'Chromium Engine' },
        { name: 'Brother 5B', role: 'Mobile Touch & Overflow Auditor', model: 'Chromium Engine' }
      ],
      description: 'Automated headless Chromium audit verifying HTTP 200, WebGL canvas render, button motion, and 0 horizontal mobile overflow.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
          <Brain className="w-3.5 h-3.5 text-gold-400" />
          <span>Graphify & Claude-Mem Complete Knowledge Center</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">
          Architecture, Memory & Agent Swarm
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Explore all interactive views: the **Claude-Mem Persistent Memory Graph**, the **Brothers Swarm Hierarchy**, 
          the **12 Agent Models Dossier**, the **Architecture Blueprint**, and the live **Memory Chronology Log**.
        </p>
      </div>

      {/* COMPLETE ALL-IN-ONE NAVIGATION TABS (All options preserved!) */}
      <div className="flex justify-center border-b border-white/10 pb-4">
        <div className="glass-panel p-1.5 rounded-2xl flex flex-wrap items-center justify-center gap-1.5 border border-white/10">
          
          {/* TAB 1: CLAUDE-MEM MEMORY GRAPH */}
          <button
            onClick={() => { setActiveTab('memory_graph'); setSelectedNode(null); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'memory_graph'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold shadow-lg shadow-pink-500/25 ring-1 ring-pink-400'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-pink-300" />
            <span>Memory Graph</span>
          </button>

          {/* TAB 2: BROTHERS SWARM GRAPH */}
          <button
            onClick={() => { setActiveTab('brothers_graph'); setSelectedNode(null); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'brothers_graph'
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/25 ring-1 ring-gold-400'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Brothers Swarm Graph</span>
          </button>

          {/* TAB 3: 12 AGENTS & SKILLS DOSSIER */}
          <button
            onClick={() => setActiveTab('all_agents')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'all_agents'
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>12 Brother Agents</span>
          </button>

          {/* TAB 4: ARCHITECTURE BLUEPRINT */}
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Architecture Blueprint</span>
          </button>

          {/* TAB 5: CLAUDE-MEM CHRONOLOGY LOG */}
          <button
            onClick={() => setActiveTab('claude_mem_log')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'claude_mem_log'
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Claude-Mem Log</span>
          </button>
        </div>
      </div>

      {/* VIEW 1 & 2: INTERACTIVE VISUAL GRAPH CANVAS (Memory or Brothers) */}
      {(activeTab === 'memory_graph' || activeTab === 'brothers_graph') && (
        <div className="space-y-6">
          <div className="relative w-full bg-[#07090e] rounded-3xl border border-gold-500/30 overflow-hidden shadow-2xl p-4 sm:p-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 text-xs text-slate-300">
              <div className="flex items-center space-x-4">
                {isMemoryMode ? (
                  <>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ec4899]"></span> Memory Core</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#d97706]"></span> Decision Domains</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#fbbf24]"></span> Stored Observations</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ffffff]"></span> Persistent Disk Storage</span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span> Supervisor</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#d97706]"></span> Skills</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#67e8f9]"></span> Brother Agents</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#e2e8f0]"></span> Code Components</span>
                  </>
                )}
              </div>
              <div className="text-[11px] text-gold-400 font-mono">
                {isMemoryMode ? 'Visualizing: Claude-Mem Cross-Session Memory Graph' : 'Visualizing: Council of Brothers Agent Network'} • {currentNodes.length} Nodes
              </div>
            </div>

            <div className="relative overflow-x-auto">
              <canvas
                ref={canvasRef}
                width={1200}
                height={580}
                onMouseMove={handleCanvasMouseMove}
                onClick={handleCanvasClick}
                className="w-full h-[580px] cursor-pointer"
              />
            </div>

            {selectedNode && (
              <div className="mt-4 p-4 rounded-2xl glass-panel-gold border border-gold-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/50 text-gold-400 border border-gold-500/30">
                      {selectedNode.type}
                    </span>
                    <h4 className="text-base font-serif text-white font-bold">{selectedNode.label}</h4>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {selectedNode.desc || `Agent model: ${selectedNode.model} paired for skill: ${selectedNode.skill}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-colors shrink-0"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: 12 BROTHERS DOSSIER */}
      {activeTab === 'all_agents' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domainClusters.map((cluster) => (
              <div key={cluster.id} className="glass-panel p-6 rounded-3xl border border-gold-500/30 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold block">
                      Skill: {cluster.skill}
                    </span>
                    <h3 className="text-lg font-serif text-white font-normal mt-0.5">{cluster.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                    Dual Pair
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">{cluster.description}</p>
                <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-[10px]">
                  {cluster.leadModels.map((agent, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                      <div className="flex justify-between text-gold-300 font-bold">
                        <span>{agent.name}</span>
                        <span className="text-slate-400 font-normal">{agent.role}</span>
                      </div>
                      <div className="text-slate-400 truncate">{agent.model}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: ARCHITECTURE BLUEPRINT */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400">Knowledge Nodes</span>
              <div className="text-2xl font-serif text-white lining-nums font-bold">18 Nodes</div>
              <p className="text-[11px] text-slate-400">Models, Skills, Domains</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400">Graphify Edges</span>
              <div className="text-2xl font-serif text-white lining-nums font-bold">24 Directed</div>
              <p className="text-[11px] text-slate-400">PracticesSkill & Collab</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400">Agent Models</span>
              <div className="text-2xl font-serif text-white lining-nums font-bold">12 Brothers</div>
              <p className="text-[11px] text-slate-400">6 Dual-Model Clusters</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400">LLM Cost</span>
              <div className="text-2xl font-serif text-emerald-400 lining-nums font-bold">100% Free</div>
              <p className="text-[11px] text-slate-400">OpenRouter Free Tier</p>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-4">
            {[
              { layer: 'Layer 1: Entry & Runtime', path: 'index.html • src/main.jsx', desc: 'Vite 5 bundling, Tailwind CSS luxury palette, typography & KaTeX math' },
              { layer: 'Layer 2: Sensory Motion Engine', path: 'LiquidBackgroundMesh.jsx • LiquidTitaniumMagneticMotion.jsx', desc: 'Fluid specular sheen, tactile micro-spring haptics, magnetic cursor aura' },
              { layer: 'Layer 3: Sovereign 3D Studio', path: 'ThreeVillaViewer.jsx (Three.js & WebGL)', desc: 'PBR shading, OrbitControls, Astronomical Solar Dial (6 AM - 7 PM), Caliper Overlay' },
              { layer: 'Layer 4: Real Estate Portfolios', path: 'EstatesShowcase.jsx • HeroBanner.jsx • HomeHighlights.jsx', desc: 'Worli Sea-Face Bungalow (₹145 Cr) & Assagao Cantilever Villa (₹48.5 Cr)' },
              { layer: 'Layer 5: Bespoke VIP Services', path: 'ServicesSection.jsx • AboutSection.jsx • JournalSection.jsx', desc: 'Family Office Advisory, Heritage conservation, bespoke architectural blueprints' },
              { layer: 'Layer 6: Swarm Memory & Knowledge Graph', path: 'council_graphify.json • council_claude_mem.json', desc: '18 Graphify nodes, 24 edges, persistent observations & verification records' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gold-400 uppercase font-bold">{item.layer}</span>
                  <h4 className="text-sm font-mono text-white mt-0.5">{item.path}</h4>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: CLAUDE-MEM CHRONOLOGY LOG */}
      {activeTab === 'claude_mem_log' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-serif text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-gold-400" />
                <span>Claude-Mem Cross-Session Memory Chronology</span>
              </h3>
              <p className="text-xs text-slate-400 font-light">
                Durable record of observations generated by the Brother agents, saved into `src/memory/council_claude_mem.json`.
              </p>
            </div>
            <span className="text-[10px] font-mono text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/30">
              {councilClaudeMemData.observations?.length || 0} Persisted Events
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(councilClaudeMemData.observations || []).slice(-8).reverse().map((mem, i) => (
              <div 
                key={mem.id || i}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-gold-500/40 transition-all"
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gold-400 font-bold">{mem.brotherId} • {mem.skillName}</span>
                  <span className="text-slate-500">{new Date(mem.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {mem.observation}
                </p>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">{mem.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
