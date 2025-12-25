import React from 'react';
import { useSkillTreeStore } from '../store/skillTreeStore';

export const Header: React.FC = () => {
  const totalPoints = useSkillTreeStore(state => state.totalPoints);
  const maxPoints = useSkillTreeStore(state => state.maxPoints);
  const expeditionTier = useSkillTreeStore(state => state.expeditionTier);
  const setExpeditionTier = useSkillTreeStore(state => state.setExpeditionTier);
  const resetAllSkills = useSkillTreeStore(state => state.resetAllSkills);
  const undo = useSkillTreeStore(state => state.undo);
  const redo = useSkillTreeStore(state => state.redo);
  const canUndo = useSkillTreeStore(state => state.canUndo());
  const canRedo = useSkillTreeStore(state => state.canRedo());

  const pointsRemaining = maxPoints - totalPoints;
  const isOverLimit = totalPoints > maxPoints;

  return (
    <header className="bg-charcoal border-b-2 border-panel-border p-6 scanlines grain">
      <div className="max-w-7xl mx-auto">
        {/* Title and Logo Area */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="terminal-header text-3xl mb-2">
              ARC RAIDERS
            </h1>
            <p className="text-text-secondary text-sm font-body">
              Skill Tree Builder / Operative Configuration System
            </p>
          </div>

          {/* Point Counter */}
          <div className="chamfered bg-gunmetal border-2 border-warning px-8 py-4">
            <div className="text-center">
              <div className={`hud-data text-4xl mb-1 ${isOverLimit ? 'text-critical' : ''}`}>
                {totalPoints} / {maxPoints}
              </div>
              <div className="text-text-secondary text-xs uppercase tracking-wider">
                Skill Points
              </div>
              {pointsRemaining > 0 && (
                <div className="text-industrial text-sm mt-1">
                  {pointsRemaining} remaining
                </div>
              )}
              {isOverLimit && (
                <div className="text-critical text-xs mt-1 animate-pulse">
                  OVER LIMIT
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Expedition Tier Selector */}
          <div className="flex items-center gap-2">
            <label className="text-text-secondary text-sm font-display uppercase tracking-wider">
              Expedition Tier:
            </label>
            <select
              value={expeditionTier}
              onChange={(e) => setExpeditionTier(Number(e.target.value))}
              className="
                chamfered-sm
                bg-charcoal border-2 border-panel-border
                text-industrial font-mono
                px-3 py-2
                hover:border-warning/50
                transition-smooth
                cursor-pointer
              "
            >
              <option value={0}>0 (Base: 75 points)</option>
              <option value={1}>1 (+5 points)</option>
              <option value={2}>2 (+10 points)</option>
              <option value={3}>3 (+15 points)</option>
              <option value={4}>4 (+20 points)</option>
              <option value={5}>5 (+25 points)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto">
            {/* Undo */}
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`
                chamfered-sm px-4 py-2
                font-display uppercase text-sm
                border-2 transition-smooth
                ${canUndo 
                  ? 'bg-survival/10 border-survival text-survival hover:bg-survival/20 chromatic-hover' 
                  : 'bg-charcoal border-panel-border text-text-secondary opacity-50 cursor-not-allowed'
                }
              `}
              title="Undo (Ctrl+Z)"
            >
              ◀ Undo
            </button>

            {/* Redo */}
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`
                chamfered-sm px-4 py-2
                font-display uppercase text-sm
                border-2 transition-smooth
                ${canRedo 
                  ? 'bg-survival/10 border-survival text-survival hover:bg-survival/20 chromatic-hover' 
                  : 'bg-charcoal border-panel-border text-text-secondary opacity-50 cursor-not-allowed'
                }
              `}
              title="Redo (Ctrl+Y)"
            >
              Redo ▶
            </button>

            {/* Reset All */}
            <button
              onClick={() => {
                if (window.confirm('Reset all skills? This cannot be undone beyond the current history.')) {
                  resetAllSkills();
                }
              }}
              className="
                chamfered-sm px-4 py-2
                font-display uppercase text-sm
                bg-critical/10 border-2 border-critical text-critical
                hover:bg-critical/20
                transition-smooth
                chromatic-hover
              "
            >
              ⟲ Reset All
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


