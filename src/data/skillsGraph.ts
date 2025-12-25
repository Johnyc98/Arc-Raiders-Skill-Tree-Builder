import { Skill } from '../types';
import { ALL_COMPLETE_SKILLS } from './completeSkills';

/**
 * Arc Raiders Skill Tree - Radial Graph Layout Calculator
 * 
 * Based on game screenshots analysis:
 * - 3 main trees in Y-formation
 * - Conditioning: Bottom-left (210°), Green  
 * - Mobility: Top (90°), Yellow
 * - Survival: Bottom-right (330°), Red
 * 
 * Each tree spreads ~70 degrees
 * Skills arranged in 7 tiers (rings) radiating outward
 */

// Helper to convert polar to cartesian coordinates
export const polarToCartesian = (angle: number, radius: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radian) * radius,
    y: Math.sin(radian) * radius,
  };
};

/**
 * Calculate precise positions for all 45 skills
 * Uses polar coordinates for authentic radial layout
 */
export const calculateSkillPositions = () => {
  const centerX = 550; // Center of canvas
  const centerY = 500;
  
  // Tree configuration matching game layout
  const treeConfigs = {
    'Conditioning': { 
      baseAngle: 210,    // Bottom-left
      angleSpread: 70,    // Spread width
      color: '#4c7510'    // Green
    },
    'Mobility': { 
      baseAngle: 90,     // Top
      angleSpread: 70,
      color: '#D4A017'   // Yellow  
    },
    'Survival': { 
      baseAngle: 330,    // Bottom-right
      angleSpread: 70,
      color: '#D95204'   // Red
    },
  };

  const positionedSkills: Skill[] = [];

  // Group skills by tree
  const skillsByTree = {
    'Conditioning': ALL_COMPLETE_SKILLS.filter(s => s.tree === 'Conditioning'),
    'Mobility': ALL_COMPLETE_SKILLS.filter(s => s.tree === 'Mobility'),
    'Survival': ALL_COMPLETE_SKILLS.filter(s => s.tree === 'Survival'),
  };

  Object.entries(skillsByTree).forEach(([treeName, skills]) => {
    const config = treeConfigs[treeName as keyof typeof treeConfigs];
    
    skills.forEach(skill => {
      const tier = skill.uiPosition.tier;
      
      // Calculate radius - 90px per tier from center
      const radius = tier * 90;
      
      // Get all skills in same tier for this tree
      const tierSkills = skills.filter(s => s.uiPosition.tier === tier);
      const indexInTier = tierSkills.indexOf(skill);
      
      // Calculate angle spread within tier
      const angleStep = tierSkills.length > 1 
        ? config.angleSpread / (tierSkills.length - 1) 
        : 0;
      
      const angle = config.baseAngle - (config.angleSpread / 2) + (indexInTier * angleStep);
      
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

// Export positioned skills ready for rendering
export const POSITIONED_SKILLS = calculateSkillPositions();

// Export helper to get skills by tree
export const getSkillsByTree = (tree: string) => {
  return POSITIONED_SKILLS.filter(s => s.tree === tree);
};

// Export helper to get skill by ID
export const getSkillById = (id: string) => {
  return POSITIONED_SKILLS.find(s => s.id === id);
};
