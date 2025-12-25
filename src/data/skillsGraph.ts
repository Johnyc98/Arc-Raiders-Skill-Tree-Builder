import type { Skill } from '../types';
import { ALL_COMPLETE_SKILLS } from './completeSkills';

/**
 * Precise Manual Mapping - Based on exact game screenshots
 * 
 * Structure Analysis:
 * - 3 root nodes at center forming Y-shape
 * - Mobility (Yellow) - Top
 * - Conditioning (Green) - Bottom Left  
 * - Survival (Red) - Bottom Right
 * 
 * Canvas: 1200x1100
 * Center area: ~600x550
 */

// Root positions (3 starting points)
const ROOT_POSITIONS = {
  mobility: { x: 600, y: 200 },      // Top center
  conditioning: { x: 400, y: 550 },  // Bottom left
  survival: { x: 800, y: 550 },      // Bottom right
};

/**
 * Precise skill positions based on screenshot analysis
 * Organized by tree and tier
 */
const PRECISE_POSITIONS: Record<string, { x: number; y: number; tier: number }> = {
  // ============================================
  // MOBILITY TREE (Yellow) - Top
  // ============================================
  'mob_nimble_climber': { x: 600, y: 200, tier: 1 },  // Root
  'mob_marathon_runner': { x: 550, y: 250, tier: 1 },
  'mob_slip_and_slide': { x: 650, y: 250, tier: 1 },
  
  'mob_youthful_lungs': { x: 520, y: 300, tier: 2 },
  'mob_sturdy_ankles': { x: 600, y: 300, tier: 2 },
  'mob_carry_momentum': { x: 680, y: 300, tier: 2 },
  
  'mob_calming_stroll': { x: 500, y: 350, tier: 3 },
  'mob_effortless_roll': { x: 580, y: 350, tier: 3 },
  'mob_heroic_leap': { x: 660, y: 350, tier: 3 },
  
  'mob_crawl_before_walk': { x: 480, y: 400, tier: 4 },
  'mob_vigorous_vaulter': { x: 560, y: 400, tier: 4 },
  
  'mob_off_the_wall': { x: 440, y: 450, tier: 5 },
  'mob_ready_to_roll': { x: 520, y: 450, tier: 5 },
  
  'mob_vaults_on_vaults': { x: 400, y: 500, tier: 6 },
  'mob_vault_spring': { x: 480, y: 500, tier: 7 },
  
  // ============================================
  // CONDITIONING TREE (Green) - Bottom Left
  // ============================================
  'cond_gentle_pressure': { x: 400, y: 550, tier: 1 },  // Root
  'cond_blast_born': { x: 350, y: 600, tier: 1 },
  'cond_used_to_weight': { x: 450, y: 600, tier: 1 },
  
  'cond_fight_or_flight': { x: 300, y: 650, tier: 2 },
  'cond_proficient_pryer': { x: 400, y: 650, tier: 2 },
  'cond_survivors_stamina': { x: 500, y: 650, tier: 2 },
  
  'cond_unburdened_roll': { x: 250, y: 700, tier: 3 },
  'cond_downed_but_determined': { x: 350, y: 700, tier: 3 },
  
  'cond_little_extra': { x: 200, y: 750, tier: 4 },
  'cond_effortless_swing': { x: 300, y: 750, tier: 4 },
  
  'cond_turtle_crawl': { x: 150, y: 800, tier: 5 },
  'cond_loaded_arms': { x: 250, y: 800, tier: 5 },
  
  'cond_sky_clearing_swing': { x: 100, y: 850, tier: 6 },
  'cond_back_on_feet': { x: 200, y: 850, tier: 6 },
  'cond_flyswatter': { x: 50, y: 900, tier: 7 },
  
  // ============================================
  // SURVIVAL TREE (Red) - Bottom Right
  // ============================================
  'surv_agile_croucher': { x: 800, y: 550, tier: 1 },  // Root
  'surv_looters_instincts': { x: 750, y: 600, tier: 1 },
  'surv_revitalizing_squat': { x: 850, y: 600, tier: 1 },
  
  'surv_silent_scavenger': { x: 700, y: 650, tier: 2 },
  'surv_in_round_crafting': { x: 800, y: 650, tier: 2 },
  'surv_suffer_in_silence': { x: 900, y: 650, tier: 2 },
  
  'surv_good_as_new': { x: 650, y: 700, tier: 3 },
  'surv_broad_shoulders': { x: 750, y: 700, tier: 3 },
  'surv_traveling_tinkerer': { x: 850, y: 700, tier: 3 },
  
  'surv_stubborn_mule': { x: 600, y: 750, tier: 4 },
  'surv_looters_luck': { x: 700, y: 750, tier: 4 },
  
  'surv_one_raiders_scraps': { x: 550, y: 800, tier: 5 },
  'surv_three_deep_breaths': { x: 650, y: 800, tier: 5 },
  
  'surv_security_breach': { x: 500, y: 850, tier: 6 },
  'surv_minesweeper': { x: 600, y: 850, tier: 7 },
};

/**
 * Apply precise positions to all skills
 */
export const applyManualPositions = (): Skill[] => {
  return ALL_COMPLETE_SKILLS.map(skill => {
    const position = PRECISE_POSITIONS[skill.id];
    
    if (position) {
      return {
        ...skill,
        uiPosition: {
          x: position.x,
          y: position.y,
          tier: position.tier,
        },
      };
    }
    
    // If not mapped, use default position
    console.warn(`Skill ${skill.id} not mapped, using default position`);
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
