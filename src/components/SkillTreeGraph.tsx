import React, { useMemo } from 'react';
import { useSkillTreeStore } from '../store/skillTreeStore';
import { Skill } from '../types';

interface SkillTreeGraphProps {
  skills: Skill[];
}

export const SkillTreeGraph: React.FC<SkillTreeGraphProps> = ({ skills }) => {
  const allocatePoint = useSkillTreeStore(state => state.allocatePoint);
  const deallocatePoint = useSkillTreeStore(state => state.deallocatePoint);
  const canAllocatePoint = useSkillTreeStore(state => state.canAllocatePoint);
  const allSkills = useSkillTreeStore(state => state.skills);

  // Find connections between skills
  const connections = useMemo(() => {
    const edges: { from: Skill; to: Skill }[] = [];
    
    skills.forEach(skill => {
      skill.prerequisites.forEach(prereqId => {
        const prereq = skills.find(s => s.id === prereqId);
        if (prereq) {
          edges.push({ from: prereq, to: skill });
        }
      });
    });

    return edges;
  }, [skills]);

  const getSkillState = (skill: Skill) => {
    const current = allSkills.find(s => s.id === skill.id);
    return current || skill;
  };

  const getTreeColor = (treeName: string) => {
    switch (treeName) {
      case 'Conditioning': return '#4c7510';
      case 'Mobility': return '#D4A017';
      case 'Survival': return '#D95204';
      default: return '#9CA3AF';
    }
  };

  const getSkillRadius = (skill: Skill) => {
    if (skill.uiPosition.tier === 0) return 30; // Root
    if (skill.type === 'binary') return 35; // Keystones
    return 25; // Regular
  };

  return (
    <svg 
      width="800" 
      height="800" 
      className="skill-tree-graph"
      style={{ background: 'radial-gradient(circle, #1A1D21 0%, #0F1115 100%)' }}
    >
      {/* Render connections first (below nodes) */}
      {connections.map((conn, idx) => {
        const fromState = getSkillState(conn.from);
        const toState = getSkillState(conn.to);
        const isActive = fromState.currentRank > 0 && toState.currentRank > 0;
        const isPartiallyActive = fromState.currentRank > 0;
        
        return (
          <line
            key={`edge-${idx}`}
            x1={conn.from.uiPosition.x}
            y1={conn.from.uiPosition.y}
            x2={conn.to.uiPosition.x}
            y2={conn.to.uiPosition.y}
            stroke={
              isActive 
                ? getTreeColor(conn.to.tree)
                : isPartiallyActive
                ? getTreeColor(conn.to.tree) + '40'
                : '#2C3038'
            }
            strokeWidth={isActive ? 3 : 2}
            strokeOpacity={isActive ? 1 : 0.5}
            className="transition-smooth"
          />
        );
      })}

      {/* Render skill nodes */}
      {skills.map(skill => {
        const state = getSkillState(skill);
        const isActive = state.currentRank > 0;
        const isMaxed = state.currentRank === state.maxRank;
        const isLocked = !canAllocatePoint(skill.id) && state.currentRank === 0;
        const radius = getSkillRadius(skill);
        const treeColor = getTreeColor(skill.tree);

        return (
          <g 
            key={skill.id}
            className={`skill-node ${isLocked ? 'locked' : 'unlocked'} cursor-pointer`}
            onClick={() => !isLocked && allocatePoint(skill.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              deallocatePoint(skill.id);
            }}
          >
            {/* Glow effect for active skills */}
            {isActive && (
              <circle
                cx={skill.uiPosition.x}
                cy={skill.uiPosition.y}
                r={radius + 10}
                fill={treeColor}
                opacity={0.2}
                className="animate-pulse-slow"
              />
            )}

            {/* Main circle */}
            <circle
              cx={skill.uiPosition.x}
              cy={skill.uiPosition.y}
              r={radius}
              fill={isActive ? treeColor + '30' : '#1A1D21'}
              stroke={isActive ? treeColor : isLocked ? '#790000' : '#2C3038'}
              strokeWidth={isActive ? 3 : 2}
              className="transition-smooth"
            />

            {/* Maxed indicator - diagonal stripes */}
            {isMaxed && (
              <>
                <defs>
                  <pattern
                    id={`stripe-${skill.id}`}
                    patternUnits="userSpaceOnUse"
                    width="8"
                    height="8"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="8"
                      stroke={treeColor}
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>
                <circle
                  cx={skill.uiPosition.x}
                  cy={skill.uiPosition.y}
                  r={radius - 3}
                  fill={`url(#stripe-${skill.id})`}
                />
              </>
            )}

            {/* Lock icon for locked skills */}
            {isLocked && (
              <text
                x={skill.uiPosition.x}
                y={skill.uiPosition.y + 5}
                textAnchor="middle"
                fontSize="16"
                fill="#790000"
              >
                🔒
              </text>
            )}

            {/* Rank display for non-locked skills */}
            {!isLocked && (
              <text
                x={skill.uiPosition.x}
                y={skill.uiPosition.y + 5}
                textAnchor="middle"
                fontSize="12"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="bold"
                fill={isActive ? treeColor : '#9CA3AF'}
              >
                {state.currentRank}/{skill.maxRank}
              </text>
            )}

            {/* Skill name below node */}
            <text
              x={skill.uiPosition.x}
              y={skill.uiPosition.y + radius + 15}
              textAnchor="middle"
              fontSize="10"
              fontFamily="Barlow, sans-serif"
              fill="#E0E0E0"
              className="pointer-events-none"
            >
              {skill.name}
            </text>

            {/* Tooltip on hover */}
            <title>
              {skill.name}
              {'\n'}
              {skill.description}
              {skill.effectPerRank && '\n' + skill.effectPerRank}
              {'\n'}
              Left Click: Add | Right Click: Remove
            </title>
          </g>
        );
      })}

      {/* Center connection lines from center */}
      <circle
        cx="400"
        cy="400"
        r="5"
        fill="#D95204"
        opacity="0.5"
      />
    </svg>
  );
};

