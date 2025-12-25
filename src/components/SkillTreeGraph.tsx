import type { FC } from 'react';
import { useMemo } from 'react';
import { useSkillTreeStore } from '../store/skillTreeStore';
import { Skill } from '../types';

interface SkillTreeGraphProps {
  skills: Skill[];
}

export const SkillTreeGraph: FC<SkillTreeGraphProps> = ({ skills }) => {
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
    if (skill.type === 'binary') return 40; // Keystones - larger
    return 30; // Regular skills
  };

  // Get icon/emoji for skill based on its properties
  const getSkillIcon = (skill: Skill) => {
    // Based on skill name/type
    if (skill.name.includes('Climb')) return '🧗';
    if (skill.name.includes('Sprint') || skill.name.includes('Run')) return '🏃';
    if (skill.name.includes('Roll') || skill.name.includes('Dodge')) return '🤸';
    if (skill.name.includes('Health') || skill.name.includes('Regen')) return '❤️';
    if (skill.name.includes('Stamina') || skill.name.includes('Lung')) return '💨';
    if (skill.name.includes('Breach') || skill.name.includes('Security')) return '🔓';
    if (skill.name.includes('Loot') || skill.name.includes('Scaven')) return '🔍';
    if (skill.name.includes('Craft')) return '🔧';
    if (skill.name.includes('Noise') || skill.name.includes('Silent')) return '🤫';
    if (skill.name.includes('Weight') || skill.name.includes('Shoulder') || skill.name.includes('Carry')) return '💪';
    if (skill.name.includes('Mine')) return '💣';
    if (skill.name.includes('Fall') || skill.name.includes('Ankle')) return '🦵';
    if (skill.name.includes('Vault')) return '🪜';
    if (skill.name.includes('Wall')) return '🧱';
    if (skill.name.includes('Crouch')) return '🐱';
    return '⚡'; // Default
  };

  return (
    <svg 
      width="1100" 
      height="1000" 
      className="skill-tree-graph"
      style={{ background: 'radial-gradient(circle, #1A1D21 0%, #0F1115 100%)' }}
      viewBox="0 0 1100 1000"
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

            {/* Icon in center of circle */}
            <text
              x={skill.uiPosition.x}
              y={skill.uiPosition.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={isLocked ? "20" : "24"}
              className="pointer-events-none"
            >
              {isLocked ? '🔒' : getSkillIcon(skill)}
            </text>

            {/* Rank display below icon */}
            {!isLocked && (
              <text
                x={skill.uiPosition.x}
                y={skill.uiPosition.y + 18}
                textAnchor="middle"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="bold"
                fill={isActive ? treeColor : '#9CA3AF'}
              >
                {state.currentRank}/{skill.maxRank}
              </text>
            )}

            {/* Skill name below node - split into multiple lines if needed */}
            {skill.name.split(' ').map((word, i, arr) => (
              <text
                key={i}
                x={skill.uiPosition.x}
                y={skill.uiPosition.y + radius + 18 + (i * 12)}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Barlow, sans-serif"
                fontWeight="500"
                fill="#E0E0E0"
                className="pointer-events-none"
              >
                {word}
              </text>
            ))}

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

