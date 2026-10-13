import fs from 'fs';
import path from 'path';

const MEM_STORE_PATH = path.resolve(process.cwd(), 'src/memory/council_claude_mem.json');
const GRAPH_STORE_PATH = path.resolve(process.cwd(), 'src/memory/council_graphify.json');

// Ensure storage directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Claude-Mem Persistent Cross-Session Memory Store
 * Stores observation chronologies, design decisions, approved rules, and brother insights
 */
export class CouncilClaudeMem {
  constructor() {
    ensureDir(MEM_STORE_PATH);
    this.store = this.load();
  }

  load() {
    if (fs.existsSync(MEM_STORE_PATH)) {
      try {
        return JSON.parse(fs.readFileSync(MEM_STORE_PATH, 'utf8'));
      } catch (e) {
        return { observations: [], decisions: [], project: 'AURA_PRIVE' };
      }
    }
    return { observations: [], decisions: [], project: 'AURA_PRIVE' };
  }

  save() {
    fs.writeFileSync(MEM_STORE_PATH, JSON.stringify(this.store, null, 2), 'utf8');
  }

  recordObservation(brotherId, skillName, observation, outcome = 'approved') {
    const entry = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      brotherId,
      skillName,
      observation,
      outcome
    };
    this.store.observations.push(entry);
    this.save();
    return entry;
  }

  searchMemories(query) {
    const q = query.toLowerCase();
    return this.store.observations.filter(o => 
      o.skillName.toLowerCase().includes(q) || 
      o.observation.toLowerCase().includes(q) ||
      o.brotherId.toLowerCase().includes(q)
    );
  }

  getAllObservations() {
    return this.store.observations;
  }
}

/**
 * Graphify Knowledge Graph
 * Models Brothers, Skills, Model Pairings, Components, and Architectural Domains as a persistent Graph
 */
export class CouncilGraphify {
  constructor() {
    ensureDir(GRAPH_STORE_PATH);
    this.graph = this.load();
  }

  load() {
    if (fs.existsSync(GRAPH_STORE_PATH)) {
      try {
        return JSON.parse(fs.readFileSync(GRAPH_STORE_PATH, 'utf8'));
      } catch (e) {
        return this.initGraph();
      }
    }
    return this.initGraph();
  }

  initGraph() {
    return {
      nodes: {},
      edges: [],
      lastUpdated: new Date().toISOString()
    };
  }

  save() {
    this.graph.lastUpdated = new Date().toISOString();
    fs.writeFileSync(GRAPH_STORE_PATH, JSON.stringify(this.graph, null, 2), 'utf8');
  }

  addNode(id, type, label, metadata = {}) {
    this.graph.nodes[id] = {
      id,
      type, // 'Brother' | 'Skill' | 'LLM_Model' | 'Component' | 'Domain'
      label,
      metadata,
      updatedAt: new Date().toISOString()
    };
    this.save();
  }

  addEdge(source, target, relation, weight = 1.0) {
    const exists = this.graph.edges.find(e => e.source === source && e.target === target && e.relation === relation);
    if (!exists) {
      this.graph.edges.push({ source, target, relation, weight });
      this.save();
    }
  }

  queryNeighbors(nodeId) {
    return this.graph.edges.filter(e => e.source === nodeId || e.target === nodeId);
  }

  explainNode(nodeId) {
    const node = this.graph.nodes[nodeId];
    if (!node) return `Node ${nodeId} not found in Graphify.`;
    const connections = this.queryNeighbors(nodeId);
    return {
      node,
      connectionsCount: connections.length,
      connections
    };
  }
}
