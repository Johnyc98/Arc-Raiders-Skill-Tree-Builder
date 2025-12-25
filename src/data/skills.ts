import { Skill } from '../types';

/**
 * Arc Raiders Skill Tree Data
 * 
 * This is a foundational dataset based on research.
 * Skills are organized by tree and tier.
 * 
 * Sources:
 * - arcraidershub.com/skills
 * - arcraiderskill.com/wiki.html
 * - In-game research
 */

export const SKILLS: Skill[] = [
  // ============================================================
  // CONDITIONING TREE - Orange/Red Theme
  // Focus: Health, Resilience, Physical Strength
  // ============================================================
  
  // TIER 1 - Starting Skills
  {
    id: 'cond_turtle_crawl',
    name: 'Turtle Crawl',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Reduces damage taken while prone.',
    effectPerRank: '-5% damage taken while prone per rank (Max: -25%)',
    radarImpact: {
      Resilience: 4,
      Stealth: 1,
    },
    uiPosition: { x: 1, y: 1, tier: 1 },
  },
  {
    id: 'cond_sturdy_ankles',
    name: 'Sturdy Ankles',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Reduces fall damage taken.',
    effectPerRank: '-10% fall damage per rank (Max: -50%)',
    radarImpact: {
      Resilience: 3,
      Agility: 1,
    },
    uiPosition: { x: 2, y: 1, tier: 1 },
  },
  {
    id: 'cond_back_on_feet',
    name: 'Back on Your Feet',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Increases health regeneration speed.',
    effectPerRank: '+8% health regeneration per rank (Max: +40%)',
    radarImpact: {
      Resilience: 5,
    },
    uiPosition: { x: 3, y: 1, tier: 1 },
  },

  // TIER 2
  {
    id: 'cond_thick_skin',
    name: 'Thick Skin',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 5,
    prerequisites: ['cond_turtle_crawl'],
    description: 'Increases maximum health.',
    effectPerRank: '+3% max health per rank (Max: +15%)',
    radarImpact: {
      Resilience: 6,
    },
    uiPosition: { x: 1, y: 2, tier: 2 },
  },

  // ============================================================
  // MOBILITY TREE - Cyan/Blue Theme
  // Focus: Speed, Stamina, Movement
  // ============================================================
  
  // TIER 1
  {
    id: 'mob_marathon_runner',
    name: 'Marathon Runner',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Reduces stamina cost of sprinting.',
    effectPerRank: '-5% sprint stamina cost per rank (Max: -25%)',
    radarImpact: {
      Agility: 5,
      Endurance: 3,
    },
    uiPosition: { x: 1, y: 1, tier: 1 },
  },
  {
    id: 'mob_nimble_climber',
    name: 'Nimble Climber',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Increases climbing speed.',
    effectPerRank: '+6% climbing speed per rank (Max: +30%)',
    radarImpact: {
      Agility: 4,
      Endurance: 2,
    },
    uiPosition: { x: 2, y: 1, tier: 1 },
  },
  {
    id: 'mob_effortless_roll',
    name: 'Effortless Roll',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Reduces stamina cost of dodge rolling.',
    effectPerRank: '-6% dodge stamina cost per rank (Max: -30%)',
    radarImpact: {
      Agility: 5,
      Endurance: 2,
    },
    uiPosition: { x: 3, y: 1, tier: 1 },
  },

  // TIER 2
  {
    id: 'mob_youthful_lungs',
    name: 'Youthful Lungs',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 5,
    prerequisites: ['mob_marathon_runner'],
    description: 'Increases maximum stamina.',
    effectPerRank: '+4% max stamina per rank (Max: +20%)',
    radarImpact: {
      Endurance: 6,
      Agility: 1,
    },
    uiPosition: { x: 1, y: 2, tier: 2 },
  },
  {
    id: 'mob_three_deep_breaths',
    name: 'Three Deep Breaths',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 5,
    prerequisites: ['mob_nimble_climber'],
    description: 'Increases stamina regeneration speed.',
    effectPerRank: '+7% stamina regen per rank (Max: +35%)',
    radarImpact: {
      Endurance: 5,
    },
    uiPosition: { x: 2, y: 2, tier: 2 },
  },

  // ============================================================
  // SURVIVAL TREE - Olive Green Theme
  // Focus: Stealth, Looting, Crafting, Tactics
  // ============================================================
  
  // TIER 1
  {
    id: 'surv_gentle_pressure',
    name: 'Gentle Pressure',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Reduces noise made while moving.',
    effectPerRank: '-8% movement noise per rank (Max: -40%)',
    radarImpact: {
      Stealth: 6,
    },
    uiPosition: { x: 1, y: 1, tier: 1 },
  },
  {
    id: 'surv_broad_shoulders',
    name: 'Broad Shoulders',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Increases inventory capacity.',
    effectPerRank: '+4 inventory slots per rank (Max: +20 slots)',
    radarImpact: {
      Logistics: 8,
    },
    uiPosition: { x: 2, y: 1, tier: 1 },
  },
  {
    id: 'surv_proficient_pryer',
    name: 'Proficient Pryer',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Reduces time to loot containers.',
    effectPerRank: '-10% looting time per rank (Max: -50%)',
    radarImpact: {
      Logistics: 5,
      Utility: 2,
    },
    uiPosition: { x: 3, y: 1, tier: 1 },
  },

  // TIER 2
  {
    id: 'surv_silent_scavenger',
    name: 'Silent Scavenger',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 5,
    prerequisites: ['surv_gentle_pressure'],
    description: 'Reduces noise made while looting.',
    effectPerRank: '-10% looting noise per rank (Max: -50%)',
    radarImpact: {
      Stealth: 5,
      Logistics: 2,
    },
    uiPosition: { x: 1, y: 2, tier: 2 },
  },

  // KEYSTONE SKILLS (Binary - 1 point only)
  {
    id: 'surv_in_round_crafting',
    name: 'In-Round Crafting',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 15,
    prerequisites: [],
    description: 'Unlocks the ability to craft items during a match.',
    radarImpact: {
      Utility: 20,
      Logistics: 5,
    },
    uiPosition: { x: 2, y: 3, tier: 3 },
  },
  {
    id: 'surv_security_breach',
    name: 'Security Breach',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 36,
    prerequisites: [],
    description: 'Allows breaching of high-security locked containers.',
    radarImpact: {
      Logistics: 25,
      Utility: 5,
    },
    uiPosition: { x: 3, y: 4, tier: 4 },
  },
  {
    id: 'surv_minesweeper',
    name: 'Minesweeper',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 20,
    prerequisites: [],
    description: 'Allows disarming of mines and traps.',
    radarImpact: {
      Utility: 15,
      Stealth: 5,
    },
    uiPosition: { x: 1, y: 3, tier: 3 },
  },
];

// Helper function to get skills by tree
export const getSkillsByTree = (tree: Skill['tree']): Skill[] => {
  return SKILLS.filter(skill => skill.tree === tree);
};

// Helper function to get skill by ID
export const getSkillById = (id: string): Skill | undefined => {
  return SKILLS.find(skill => skill.id === id);
};


