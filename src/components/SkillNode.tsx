import type { FC } from 'react';
import { Skill } from '../types';

interface SkillNodeProps {
  skill: Skill;
  isLocked: boolean;
  onClick: () => void;
  onRightClick: () => void;
}

export const SkillNode: FC<SkillNodeProps> = ({ 
  skill, 
  isLocked, 
  onClick, 
  onRightClick 
}) => {
  const isActive = skill.currentRank > 0;
  const isMaxed = skill.currentRank === skill.maxRank;
  const isKeystone = skill.type === 'binary';

  const getTreeColor = () => {
    switch (skill.tree) {
      case 'Conditioning': return 'border-warning bg-warning/10';
      case 'Mobility': return 'border-survival bg-survival/10';
      case 'Survival': return 'border-organic bg-organic/10';
      default: return 'border-panel-border bg-charcoal';
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick();
  };

  return (
    <div
      className={`
        relative group cursor-pointer transition-smooth
        ${isLocked ? 'opacity-30 cursor-not-allowed' : ''}
      `}
      onClick={isLocked ? undefined : onClick}
      onContextMenu={isLocked ? undefined : handleContextMenu}
    >
      {/* Main Node */}
      <div
        className={`
          chamfered-sm
          w-24 h-24 p-2
          border-2 ${getTreeColor()}
          flex flex-col items-center justify-center
          ${isActive ? 'border-warning bg-warning/20' : ''}
          ${isMaxed ? 'bg-diagonal-stripes' : ''}
          ${!isLocked && !isActive ? 'hover:border-warning/60 chromatic-hover' : ''}
          transition-smooth
        `}
      >
        {/* Keystone indicator */}
        {isKeystone && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-industrial chamfered-sm" />
        )}

        {/* Skill Name */}
        <span className="text-xs text-center font-display uppercase leading-tight mb-1">
          {skill.name}
        </span>

        {/* Rank Display */}
        <div className="hud-data text-lg font-bold">
          {skill.currentRank}/{skill.maxRank}
        </div>
      </div>

      {/* Tooltip on Hover */}
      <div
        className="
          absolute left-full ml-4 top-0 z-50
          w-64 p-4
          chamfered
          bg-charcoal border-2 border-warning
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-300
        "
      >
        <h3 className="terminal-header text-sm mb-2">{skill.name}</h3>
        <p className="text-text-primary text-xs mb-2">{skill.description}</p>
        
        {skill.effectPerRank && (
          <p className="text-industrial text-xs mb-2 font-mono">
            {skill.effectPerRank}
          </p>
        )}

        {skill.prerequisites.length > 0 && (
          <div className="text-critical text-xs mt-2">
            <span className="font-bold">Requires:</span> Prerequisites
          </div>
        )}

        {skill.reqPointsInTree > 0 && (
          <div className="text-industrial text-xs mt-1">
            <span className="font-bold">Tree Req:</span> {skill.reqPointsInTree} points
          </div>
        )}

        <div className="mt-2 pt-2 border-t border-panel-border text-text-secondary text-xs">
          Left Click: Add Point | Right Click: Remove Point
        </div>
      </div>
    </div>
  );
};


