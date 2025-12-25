import { create } from 'zustand';
import { produce } from 'immer';
import { Skill, SkillTreeState, BuildSummary, RadarData, SkillTreeType } from '../types';
import { SKILLS } from '../data/skills';

const BASE_MAX_POINTS = 75;
const EXPEDITION_BONUS_PER_TIER = 5;

const createInitialSkills = (): Skill[] => {
  return SKILLS.map(skill => ({ ...skill, currentRank: 0 }));
};

export const useSkillTreeStore = create<SkillTreeState>((set, get) => ({
  skills: createInitialSkills(),
  totalPoints: 0,
  maxPoints: BASE_MAX_POINTS,
  expeditionTier: 0,
  history: [createInitialSkills()],
  historyIndex: 0,

  allocatePoint: (skillId: string) => {
    const state = get();
    
    if (!state.canAllocatePoint(skillId)) {
      return;
    }

    set(
      produce((draft: SkillTreeState) => {
        const skill = draft.skills.find(s => s.id === skillId);
        if (skill && skill.currentRank < skill.maxRank) {
          skill.currentRank += 1;
          draft.totalPoints += 1;
          
          // Update history for undo/redo
          const newHistory = draft.history.slice(0, draft.historyIndex + 1);
          newHistory.push(JSON.parse(JSON.stringify(draft.skills)));
          draft.history = newHistory;
          draft.historyIndex += 1;
        }
      })
    );
  },

  deallocatePoint: (skillId: string) => {
    set(
      produce((draft: SkillTreeState) => {
        const skill = draft.skills.find(s => s.id === skillId);
        if (!skill || skill.currentRank === 0) {
          return;
        }

        // Check if any other skills depend on this one
        const dependentSkills = draft.skills.filter(s => 
          s.prerequisites.includes(skillId) && s.currentRank > 0
        );

        // If this is the last point and other skills depend on it, can't remove
        if (skill.currentRank === 1 && dependentSkills.length > 0) {
          return;
        }

        skill.currentRank -= 1;
        draft.totalPoints -= 1;

        // Update history
        const newHistory = draft.history.slice(0, draft.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(draft.skills)));
        draft.history = newHistory;
        draft.historyIndex += 1;
      })
    );
  },

  resetSkill: (skillId: string) => {
    set(
      produce((draft: SkillTreeState) => {
        const skill = draft.skills.find(s => s.id === skillId);
        if (!skill) return;

        // Check for dependent skills
        const dependentSkills = draft.skills.filter(s => 
          s.prerequisites.includes(skillId) && s.currentRank > 0
        );

        if (dependentSkills.length > 0) {
          return; // Can't reset if others depend on it
        }

        draft.totalPoints -= skill.currentRank;
        skill.currentRank = 0;

        // Update history
        const newHistory = draft.history.slice(0, draft.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(draft.skills)));
        draft.history = newHistory;
        draft.historyIndex += 1;
      })
    );
  },

  resetAllSkills: () => {
    set(
      produce((draft: SkillTreeState) => {
        draft.skills = createInitialSkills();
        draft.totalPoints = 0;

        // Update history
        const newHistory = draft.history.slice(0, draft.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(draft.skills)));
        draft.history = newHistory;
        draft.historyIndex += 1;
      })
    );
  },

  setExpeditionTier: (tier: number) => {
    set({ 
      expeditionTier: tier,
      maxPoints: BASE_MAX_POINTS + (tier * EXPEDITION_BONUS_PER_TIER)
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      set(
        produce((draft: SkillTreeState) => {
          draft.historyIndex -= 1;
          draft.skills = JSON.parse(JSON.stringify(state.history[draft.historyIndex]));
          draft.totalPoints = draft.skills.reduce((sum, skill) => sum + skill.currentRank, 0);
        })
      );
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      set(
        produce((draft: SkillTreeState) => {
          draft.historyIndex += 1;
          draft.skills = JSON.parse(JSON.stringify(state.history[draft.historyIndex]));
          draft.totalPoints = draft.skills.reduce((sum, skill) => sum + skill.currentRank, 0);
        })
      );
    }
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  getPointsInTree: (tree: SkillTreeType) => {
    const state = get();
    return state.skills
      .filter(skill => skill.tree === tree)
      .reduce((sum, skill) => sum + skill.currentRank, 0);
  },

  canAllocatePoint: (skillId: string) => {
    const state = get();
    const skill = state.skills.find(s => s.id === skillId);
    
    if (!skill) return false;
    if (skill.currentRank >= skill.maxRank) return false;
    if (state.totalPoints >= state.maxPoints) return false;

    // Check prerequisites
    for (const prereqId of skill.prerequisites) {
      const prereqSkill = state.skills.find(s => s.id === prereqId);
      if (!prereqSkill || prereqSkill.currentRank === 0) {
        return false;
      }
    }

    // Check tree point requirement
    const pointsInTree = state.getPointsInTree(skill.tree);
    if (pointsInTree < skill.reqPointsInTree) {
      return false;
    }

    return true;
  },

  getBuildSummary: (): BuildSummary => {
    const state = get();
    const activeSkills = state.skills.filter(s => s.currentRank > 0);

    const fullyMaxed = activeSkills.filter(
      s => s.currentRank === s.maxRank && s.maxRank > 1
    );

    const partialInvestment = activeSkills.filter(
      s => s.currentRank > 0 && s.currentRank < s.maxRank
    );

    const onePointWonders = activeSkills.filter(
      s => s.maxRank === 1 && s.currentRank === 1
    );

    return {
      fullyMaxed,
      partialInvestment,
      onePointWonders,
    };
  },

  getRadarData: (): RadarData => {
    const state = get();
    const baseValues = {
      Agility: 10,
      Resilience: 10,
      Endurance: 10,
      Stealth: 10,
      Logistics: 10,
      Utility: 10,
    };

    // Calculate impact from all active skills
    state.skills.forEach(skill => {
      if (skill.currentRank > 0) {
        Object.entries(skill.radarImpact).forEach(([key, value]) => {
          const statKey = key as keyof RadarData;
          // For scaling skills, multiply impact by rank
          // For binary skills, just add the impact once
          const multiplier = skill.type === 'scaling' ? skill.currentRank : 1;
          baseValues[statKey] += value * multiplier;
        });
      }
    });

    // Normalize to 0-100 range (assuming max theoretical is ~150 per stat)
    const normalized: RadarData = {
      Agility: Math.min(100, (baseValues.Agility / 150) * 100),
      Resilience: Math.min(100, (baseValues.Resilience / 150) * 100),
      Endurance: Math.min(100, (baseValues.Endurance / 150) * 100),
      Stealth: Math.min(100, (baseValues.Stealth / 150) * 100),
      Logistics: Math.min(100, (baseValues.Logistics / 150) * 100),
      Utility: Math.min(100, (baseValues.Utility / 150) * 100),
    };

    return normalized;
  },
}));


