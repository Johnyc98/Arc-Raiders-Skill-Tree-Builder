import type { Skill } from '../types';
import { ALL_COMPLETE_SKILLS } from './completeSkills';

/**
 * EXACT Layout from Game Screenshot
 * 
 * Structure:
 * - 1 central root node at bottom-center
 * - 3 trees branch from center:
 *   - MOBILITY (Yellow) - goes UP
 *   - CONDITIONING (Green) - goes LEFT-UP  
 *   - SURVIVAL (Red) - goes RIGHT-UP
 * 
 * Canvas: 1200x1100
 * Center root: ~600, 900 (bottom-center)
 */

// Central root position
const CENTER_ROOT = { x: 600, y: 900 };

/**
 * Exact positions based on screenshot analysis
 * Organized by tree, starting from center root
 */
const EXACT_POSITIONS: Record<string, { x: number; y: number }> = {
  // ============================================
  // CENTRAL ROOT (connects to all 3 trees)
  // ============================================
  // This is the starting point - all trees connect here
  
  // ============================================
  // MOBILITY TREE (Yellow) - Goes UP from center
  // ============================================
  'mob_nimble_climber': { x: 600, y: 750 },      // Tier 1 - directly above center
  'mob_marathon_runner': { x: 550, y: 700 },    // Tier 1 - left branch
  'mob_slip_and_slide': { x: 650, y: 700 },      // Tier 1 - right branch
  
  'mob_youthful_lungs': { x: 520, y: 600 },      // Tier 2
  'mob_sturdy_ankles': { x: 600, y: 600 },       // Tier 2 - main path
  'mob_carry_momentum': { x: 680, y: 600 },      // Tier 2
  
  'mob_calming_stroll': { x: 500, y: 500 },      // Tier 3
  'mob_effortless_roll': { x: 580, y: 500 },     // Tier 3
  'mob_heroic_leap': { x: 660, y: 500 },         // Tier 3
  
  'mob_crawl_before_walk': { x: 480, y: 400 },   // Tier 4
  'mob_vigorous_vaulter': { x: 560, y: 400 },    // Tier 4
  
  'mob_off_the_wall': { x: 440, y: 300 },        // Tier 5
  'mob_ready_to_roll': { x: 520, y: 300 },       // Tier 5
  
  'mob_vaults_on_vaults': { x: 400, y: 200 },    // Tier 6
  'mob_vault_spring': { x: 480, y: 200 },        // Tier 7
  
  // ============================================
  // CONDITIONING TREE (Green) - Goes LEFT-UP from center
  // ============================================
  'cond_gentle_pressure': { x: 450, y: 850 },     // Tier 1 - left from center
  'cond_blast_born': { x: 400, y: 800 },          // Tier 1
  'cond_used_to_weight': { x: 500, y: 800 },      // Tier 1
  
  'cond_fight_or_flight': { x: 350, y: 750 },     // Tier 2
  'cond_proficient_pryer': { x: 450, y: 750 },    // Tier 2
  'cond_survivors_stamina': { x: 550, y: 750 },   // Tier 2
  
  'cond_unburdened_roll': { x: 300, y: 700 },     // Tier 3
  'cond_downed_but_determined': { x: 400, y: 700 }, // Tier 3
  
  'cond_little_extra': { x: 250, y: 650 },        // Tier 4
  'cond_effortless_swing': { x: 350, y: 650 },    // Tier 4
  
  'cond_turtle_crawl': { x: 200, y: 600 },        // Tier 5
  'cond_loaded_arms': { x: 300, y: 600 },         // Tier 5
  
  'cond_sky_clearing_swing': { x: 150, y: 550 },  // Tier 6
  'cond_back_on_feet': { x: 250, y: 550 },        // Tier 6
  'cond_flyswatter': { x: 100, y: 500 },           // Tier 7
  
  // ============================================
  // SURVIVAL TREE (Red) - Goes RIGHT-UP from center
  // ============================================
  'surv_agile_croucher': { x: 750, y: 850 },      // Tier 1 - right from center
  'surv_looters_instincts': { x: 700, y: 800 },    // Tier 1
  'surv_revitalizing_squat': { x: 800, y: 800 },  // Tier 1
  
  'surv_silent_scavenger': { x: 650, y: 750 },     // Tier 2
  'surv_in_round_crafting': { x: 750, y: 750 },   // Tier 2
  'surv_suffer_in_silence': { x: 850, y: 750 },   // Tier 2
  
  'surv_good_as_new': { x: 600, y: 700 },         // Tier 3
  'surv_broad_shoulders': { x: 700, y: 700 },     // Tier 3
  'surv_traveling_tinkerer': { x: 800, y: 700 },  // Tier 3
  
  'surv_stubborn_mule': { x: 550, y: 650 },       // Tier 4
  'surv_looters_luck': { x: 650, y: 650 },        // Tier 4
  
  'surv_one_raiders_scraps': { x: 500, y: 600 },  // Tier 5
  'surv_three_deep_breaths': { x: 600, y: 600 },  // Tier 5
  
  'surv_security_breach': { x: 450, y: 550 },     // Tier 6
  'surv_minesweeper': { x: 550, y: 550 },         // Tier 7
};

/**
 * Apply exact positions to all skills
 */
export const applyManualPositions = (): Skill[] => {
  return ALL_COMPLETE_SKILLS.map(skill => {
    const position = EXACT_POSITIONS[skill.id];
    
    if (position) {
      return {
        ...skill,
        uiPosition: {
          x: position.x,
          y: position.y,
          tier: skill.uiPosition.tier, // Keep original tier
        },
      };
    }
    
    // Fallback - shouldn't happen
    return {
      ...skill,
      uiPosition: {
        ...skill.uiPosition,
        x: 600,
        y: 550,
      },
    };
  });
};

export const POSITIONED_SKILLS = applyManualPositions();

export const getSkillsByTree = (tree: string) => {
  return POSITIONED_SKILLS.filter(s => s.tree === tree);
};

export const getSkillById = (id: string) => {
  return POSITIONED_SKILLS.find(s => s.id === id);
};
