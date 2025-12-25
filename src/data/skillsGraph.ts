import type { Skill } from '../types';
import { ALL_COMPLETE_SKILLS } from './completeSkills';

/**
 * Precise Manual Mapping of Arc Raiders Skill Tree
 * Based on exact screenshot analysis
 * 
 * Canvas: 1200x1100
 * Center: (600, 550)
 */

// Manual coordinate mapping based on screenshot
const SKILL_POSITIONS: Record<string, { x: number; y: number }> = {
  // CENTER - 3 roots
  'cond_gentle_pressure': { x: 390, y: 420 },
  'cond_blast_born': { x: 600, y: 350 },
  'surv_looters_instincts': { x: 810, y: 420 },
  
  // CONDITIONING (Green - Left side)
  'cond_proficient_pryer': { x: 330, y: 380 },
  'cond_survivors_stamina': { x: 290, y: 510 },
  'cond_effortless_swing': { x: 170, y: 480 },
  'cond_downed_but_determined': { x: 390, y: 320 },
  'cond_little_extra': { x: 240, y: 480 },
  'cond_turtle_crawl': { x: 100, y: 510 },
  'cond_loaded_arms': { x: 270, y: 100 },
  'cond_sky_clearing_swing': { x: 30, y: 530 },
  'cond_back_on_feet': { x: 250, y: 750 },
  'cond_flyswatter': { x: 250, y: 90 },
  'cond_unburdened_roll': { x: 240, y: 480 },
  'cond_fight_or_flight': { x: 310, y: 505 },
  'cond_used_to_weight': { x: 330, y: 500 },
  
  // MOBILITY (Yellow - Top/Upper area)
  'mob_nimble_climber': { x: 500, y: 550 },
  'mob_marathon_runner': { x: 460, y: 565 },
  'mob_slip_and_slide': { x: 550, y: 550 },
  'mob_youthful_lungs': { x: 540, y: 610 },
  'mob_sturdy_ankles': { x: 460, y: 670 },
  'mob_carry_momentum': { x: 680, y: 460 },
  'mob_calming_stroll': { x: 620, y: 690 },
  'mob_effortless_roll': { x: 460, y: 710 },
  'mob_heroic_leap': { x: 330, y: 670 },
  'mob_crawl_before_walk': { x: 660, y: 750 },
  'mob_vigorous_vaulter': { x: 290, y: 730 },
  'mob_off_the_wall': { x: 700, y: 815 },
  'mob_ready_to_roll': { x: 250, y: 790 },
  'mob_vaults_on_vaults': { x: 710, y: 860 },
  'mob_vault_spring': { x: 820, y: 525 },
  
  // SURVIVAL (Red - Right side)
  'surv_agile_croucher': { x: 490, y: 400 },
  'surv_revitalizing_squat': { x: 520, y: 460 },
  'surv_silent_scavenger': { x: 580, y: 385 },
  'surv_in_round_crafting': { x: 810, y: 420 },
  'surv_suffer_in_silence': { x: 600, y: 500 },
  'surv_good_as_new': { x: 520, y: 340 },
  'surv_broad_shoulders': { x: 580, y: 385 },
  'surv_traveling_tinkerer': { x: 600, y: 530 },
  'surv_stubborn_mule': { x: 580, y: 230 },
  'surv_looters_luck': { x: 745, y: 525 },
  'surv_one_raiders_scraps': { x: 610, y: 165 },
  'surv_three_deep_breaths': { x: 820, y: 690 },
  'surv_security_breach': { x: 640, y: 65 },
  'surv_minesweeper': { x: 880, y: 485 },
};

/**
 * Apply exact positions from screenshot to skills
 */
export const applyManualPositions = (): Skill[] => {
  return ALL_COMPLETE_SKILLS.map(skill => {
    const position = SKILL_POSITIONS[skill.id];
    
    if (position) {
      return {
        ...skill,
        uiPosition: {
          ...skill.uiPosition,
          x: position.x,
          y: position.y,
        },
      };
    }
    
    // Fallback to center if not mapped yet
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
