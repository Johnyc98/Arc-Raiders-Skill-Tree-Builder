import { Skill } from '../types';

/**
 * Arc Raiders Skill Tree - Graph Structure
 * 
 * Each tree is organized as a graph with nodes (skills) and edges (connections).
 * The layout is radial, with three main roots branching outward.
 * 
 * Position system: Polar coordinates converted to Cartesian
 * - angle: degrees from center (0-360)
 * - radius: distance from center
 */

// Helper to convert polar to cartesian
export const polarToCartesian = (angle: number, radius: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radian) * radius,
    y: Math.sin(radian) * radius,
  };
};

// ============================================================
// CONDITIONING TREE - Lower Left (Green)
// Base angle: ~210 degrees, spreads ~90 degrees
// ============================================================

export const CONDITIONING_SKILLS: Skill[] = [
  // ROOT
  {
    id: 'cond_root',
    name: 'Conditioning Root',
    tree: 'Conditioning',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Starting point for Conditioning tree',
    radarImpact: {},
    uiPosition: { x: 0, y: 0, tier: 0 }, // Center, will be calculated
  },
  
  // TIER 1 - First ring
  {
    id: 'cond_turtle_crawl',
    name: 'Turtle Crawl',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['cond_root'],
    description: 'Reduces damage taken while prone',
    effectPerRank: '-5% damage while prone per rank',
    radarImpact: { Resilience: 4, Stealth: 1 },
    uiPosition: { x: 0, y: 0, tier: 1 },
  },
  {
    id: 'cond_sturdy_ankles',
    name: 'Sturdy Ankles',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['cond_root'],
    description: 'Reduces fall damage',
    effectPerRank: '-10% fall damage per rank',
    radarImpact: { Resilience: 3, Agility: 1 },
    uiPosition: { x: 0, y: 0, tier: 1 },
  },
  {
    id: 'cond_back_on_feet',
    name: 'Back on Your Feet',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['cond_root'],
    description: 'Increases health regeneration',
    effectPerRank: '+8% health regen per rank',
    radarImpact: { Resilience: 5 },
    uiPosition: { x: 0, y: 0, tier: 1 },
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
    description: 'Increases maximum health',
    effectPerRank: '+3% max HP per rank',
    radarImpact: { Resilience: 6 },
    uiPosition: { x: 0, y: 0, tier: 2 },
  },
  {
    id: 'cond_iron_will',
    name: 'Iron Will',
    tree: 'Conditioning',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 5,
    prerequisites: ['cond_back_on_feet'],
    description: 'Reduces stagger duration',
    effectPerRank: '-8% stagger time per rank',
    radarImpact: { Resilience: 4, Utility: 1 },
    uiPosition: { x: 0, y: 0, tier: 2 },
  },
];

// ============================================================
// MOBILITY TREE - Top/Upper (Yellow)
// Base angle: ~90 degrees, spreads ~90 degrees
// ============================================================

export const MOBILITY_SKILLS: Skill[] = [
  // ROOT
  {
    id: 'mob_root',
    name: 'Mobility Root',
    tree: 'Mobility',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Starting point for Mobility tree',
    radarImpact: {},
    uiPosition: { x: 0, y: 0, tier: 0 },
  },

  // TIER 1
  {
    id: 'mob_marathon_runner',
    name: 'Marathon Runner',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['mob_root'],
    description: 'Reduces sprint stamina cost',
    effectPerRank: '-5% sprint cost per rank',
    radarImpact: { Agility: 5, Endurance: 3 },
    uiPosition: { x: 0, y: 0, tier: 1 },
  },
  {
    id: 'mob_nimble_climber',
    name: 'Nimble Climber',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['mob_root'],
    description: 'Increases climbing speed',
    effectPerRank: '+6% climb speed per rank',
    radarImpact: { Agility: 4, Endurance: 2 },
    uiPosition: { x: 0, y: 0, tier: 1 },
  },
  {
    id: 'mob_effortless_roll',
    name: 'Effortless Roll',
    tree: 'Mobility',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['mob_root'],
    description: 'Reduces dodge stamina cost',
    effectPerRank: '-6% dodge cost per rank',
    radarImpact: { Agility: 5, Endurance: 2 },
    uiPosition: { x: 0, y: 0, tier: 1 },
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
    description: 'Increases maximum stamina',
    effectPerRank: '+4% max stamina per rank',
    radarImpact: { Endurance: 6, Agility: 1 },
    uiPosition: { x: 0, y: 0, tier: 2 },
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
    description: 'Increases stamina regen',
    effectPerRank: '+7% stamina regen per rank',
    radarImpact: { Endurance: 5 },
    uiPosition: { x: 0, y: 0, tier: 2 },
  },
];

// ============================================================
// SURVIVAL TREE - Lower Right (Red)
// Base angle: ~330 degrees, spreads ~90 degrees
// ============================================================

export const SURVIVAL_SKILLS: Skill[] = [
  // ROOT
  {
    id: 'surv_root',
    name: 'Survival Root',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: [],
    description: 'Starting point for Survival tree',
    radarImpact: {},
    uiPosition: { x: 0, y: 0, tier: 0 },
  },

  // TIER 1
  {
    id: 'surv_gentle_pressure',
    name: 'Gentle Pressure',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['surv_root'],
    description: 'Reduces movement noise',
    effectPerRank: '-8% noise per rank',
    radarImpact: { Stealth: 6 },
    uiPosition: { x: 0, y: 0, tier: 1 },
  },
  {
    id: 'surv_broad_shoulders',
    name: 'Broad Shoulders',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['surv_root'],
    description: 'Increases inventory capacity',
    effectPerRank: '+4 slots per rank',
    radarImpact: { Logistics: 8 },
    uiPosition: { x: 0, y: 0, tier: 1 },
  },
  {
    id: 'surv_proficient_pryer',
    name: 'Proficient Pryer',
    tree: 'Survival',
    type: 'scaling',
    maxRank: 5,
    currentRank: 0,
    reqPointsInTree: 0,
    prerequisites: ['surv_root'],
    description: 'Reduces looting time',
    effectPerRank: '-10% loot time per rank',
    radarImpact: { Logistics: 5, Utility: 2 },
    uiPosition: { x: 0, y: 0, tier: 1 },
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
    description: 'Reduces looting noise',
    effectPerRank: '-10% loot noise per rank',
    radarImpact: { Stealth: 5, Logistics: 2 },
    uiPosition: { x: 0, y: 0, tier: 2 },
  },

  // KEYSTONE SKILLS
  {
    id: 'surv_in_round_crafting',
    name: 'In-Round Crafting',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 15,
    prerequisites: ['surv_proficient_pryer'],
    description: 'Unlocks in-match crafting',
    radarImpact: { Utility: 20, Logistics: 5 },
    uiPosition: { x: 0, y: 0, tier: 3 },
  },
  {
    id: 'surv_security_breach',
    name: 'Security Breach',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 36,
    prerequisites: ['surv_in_round_crafting'],
    description: 'Breach high-security containers',
    radarImpact: { Logistics: 25, Utility: 5 },
    uiPosition: { x: 0, y: 0, tier: 4 },
  },
  {
    id: 'surv_minesweeper',
    name: 'Minesweeper',
    tree: 'Survival',
    type: 'binary',
    maxRank: 1,
    currentRank: 0,
    reqPointsInTree: 20,
    prerequisites: ['surv_silent_scavenger'],
    description: 'Disarm mines and traps',
    radarImpact: { Utility: 15, Stealth: 5 },
    uiPosition: { x: 0, y: 0, tier: 3 },
  },
];

// Combined skills array
export const ALL_SKILLS = [
  ...CONDITIONING_SKILLS,
  ...MOBILITY_SKILLS,
  ...SURVIVAL_SKILLS,
];

// Calculate actual positions for radial layout
export const calculateSkillPositions = () => {
  const centerX = 400; // Center of the canvas
  const centerY = 400;
  
  const trees = [
    { skills: CONDITIONING_SKILLS, baseAngle: 210, color: '#4c7510' },
    { skills: MOBILITY_SKILLS, baseAngle: 90, color: '#D4A017' },
    { skills: SURVIVAL_SKILLS, baseAngle: 330, color: '#D95204' },
  ];

  const positionedSkills: Skill[] = [];

  trees.forEach(({ skills, baseAngle }) => {
    skills.forEach(skill => {
      const tier = skill.uiPosition.tier;
      const radius = tier * 100; // 100px per tier
      
      // Calculate angle offset based on index in tier
      const tierSkills = skills.filter(s => s.uiPosition.tier === tier);
      const indexInTier = tierSkills.indexOf(skill);
      const angleSpread = 60; // degrees to spread within tree
      const angleStep = tierSkills.length > 1 ? angleSpread / (tierSkills.length - 1) : 0;
      const angle = baseAngle - (angleSpread / 2) + (indexInTier * angleStep);

      const pos = polarToCartesian(angle, radius);
      
      positionedSkills.push({
        ...skill,
        uiPosition: {
          ...skill.uiPosition,
          x: centerX + pos.x,
          y: centerY + pos.y,
        },
      });
    });
  });

  return positionedSkills;
};

export const POSITIONED_SKILLS = calculateSkillPositions();

