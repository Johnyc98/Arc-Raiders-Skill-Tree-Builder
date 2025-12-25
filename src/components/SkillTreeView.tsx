import React from 'react';
import { SkillTreeGraph } from './SkillTreeGraph';
import { POSITIONED_SKILLS } from '../data/skillsGraph';

export const SkillTreeView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="chamfered bg-charcoal/50 p-8 overflow-auto">
        <h2 className="terminal-header text-2xl mb-6 text-center">
          SKILL TREE NETWORK
        </h2>
        
        <div className="relative">
          <SkillTreeGraph skills={POSITIONED_SKILLS} />
        </div>

        <div className="mt-4 text-center text-text-secondary text-sm">
          <p>Left Click: Allocate Point | Right Click: Remove Point</p>
          <p className="mt-2 text-xs opacity-60">
            <span className="text-organic">■</span> Conditioning &nbsp;
            <span className="text-industrial">■</span> Mobility &nbsp;
            <span className="text-warning">■</span> Survival
          </p>
        </div>
      </div>
    </div>
  );
};


