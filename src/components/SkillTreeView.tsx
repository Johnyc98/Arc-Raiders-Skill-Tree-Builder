import React, { useState } from 'react';
import { useSkillTreeStore } from '../store/skillTreeStore';
import { SkillNode } from './SkillNode';
import { SkillTreeType } from '../types';

export const SkillTreeView: React.FC = () => {
  const [activeTree, setActiveTree] = useState<SkillTreeType>('Conditioning');
  
  const skills = useSkillTreeStore(state => state.skills);
  const allocatePoint = useSkillTreeStore(state => state.allocatePoint);
  const deallocatePoint = useSkillTreeStore(state => state.deallocatePoint);
  const canAllocatePoint = useSkillTreeStore(state => state.canAllocatePoint);

  const treeSkills = skills.filter(s => s.tree === activeTree);

  const getTreeColor = (tree: SkillTreeType) => {
    switch (tree) {
      case 'Conditioning': return 'warning';
      case 'Mobility': return 'survival';
      case 'Survival': return 'organic';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Tree Selector */}
      <div className="flex gap-2 mb-6">
        {(['Conditioning', 'Mobility', 'Survival'] as SkillTreeType[]).map(tree => (
          <button
            key={tree}
            onClick={() => setActiveTree(tree)}
            className={`
              chamfered px-6 py-3
              font-display uppercase tracking-widest text-sm
              border-2 transition-smooth
              ${activeTree === tree 
                ? `bg-${getTreeColor(tree)}/20 border-${getTreeColor(tree)} text-${getTreeColor(tree)}` 
                : 'bg-charcoal border-panel-border text-text-secondary hover:border-warning/50'
              }
            `}
          >
            {tree}
          </button>
        ))}
      </div>

      {/* Tree Grid */}
      <div className="flex-1 overflow-auto p-8 bg-charcoal/50 chamfered">
        <div className="relative min-h-[600px]">
          {/* Simple Grid Layout - Will enhance based on actual skill positions */}
          <div className="grid grid-cols-4 gap-8">
            {treeSkills.map(skill => (
              <SkillNode
                key={skill.id}
                skill={skill}
                isLocked={!canAllocatePoint(skill.id) && skill.currentRank === 0}
                onClick={() => allocatePoint(skill.id)}
                onRightClick={() => deallocatePoint(skill.id)}
              />
            ))}
          </div>

          {/* Empty state */}
          {treeSkills.length === 0 && (
            <div className="flex items-center justify-center h-full text-text-secondary">
              <p>No skills available in this tree yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


