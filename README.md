# Arc Raiders Skill Tree Builder

An interactive skill tree builder for Arc Raiders, designed to help players plan and optimize their operative builds with a **radial graph visualization** that mirrors the in-game experience.

## Features

- ✅ **Radial Graph Visualization**: Three interconnected skill trees displayed in circular layout
  - **Conditioning Tree** (Green) - Lower left quadrant
  - **Mobility Tree** (Yellow) - Top quadrant
  - **Survival Tree** (Red) - Lower right quadrant
- ✅ **Graph-Based Navigation**: Visual connection lines show skill prerequisites
- ✅ **Smart Point Allocation**: Prerequisites, tree requirements, and point limits enforced
- ✅ **Undo/Redo**: Full history tracking with keyboard shortcuts (Ctrl+Z / Ctrl+Y)
- ✅ **Dynamic Build Summary**: Intelligent categorization of skills
  - Fully Maxed (Core Competencies)
  - Partial Investment (Efficiency Adjustments)
  - One-Point Wonders (Active Perks)
- ✅ **Radar Chart Analysis**: 6-axis performance visualization
  - Agility, Resilience, Endurance, Stealth, Logistics, Utility
- ✅ **Expedition Tier Support**: Adjust max points based on progression
- ✅ **Retro-Futuristic Design**: Faithful to Arc Raiders' visual identity
  - Chamfered corners (45° cuts)
  - Scanlines and grain effects
  - Industrial color palette
  - Terminal-style typography
  - SVG-based rendering for crisp graphics

## Tech Stack

- **React 18** + **TypeScript** - Component framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling with custom Arc Raiders theme
- **Zustand** - State management
- **Recharts** - Radar chart visualization
- **Immer** - Immutable state updates

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Allocating Skills

- **Left Click** on a skill node to add a point
- **Right Click** on a skill node to remove a point
- Hover over skills to see detailed tooltips

### Keyboard Shortcuts

- `Ctrl+Z` - Undo last action
- `Ctrl+Y` or `Ctrl+Shift+Z` - Redo

### Prerequisites

Skills may require:
- Previous skills in the tree to have at least 1 point
- A minimum number of total points spent in that tree

Locked skills will appear dimmed and cannot be selected until requirements are met.

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── SkillNode.tsx
│   ├── SkillTreeView.tsx
│   ├── BuildSummary.tsx
│   └── RadarChart.tsx
├── store/           # Zustand state management
│   └── skillTreeStore.ts
├── data/            # Skill definitions
│   └── skills.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main application
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Future Plans

- 🔄 **More Skills**: Expand skill database with all in-game skills
- 🔗 **Build Sharing**: URL-based build sharing
- 📤 **Export**: Save builds as images or JSON
- 🎮 **Overwolf Integration**: In-game overlay support
- 🌐 **Community Builds**: Gallery of popular builds

## Contributing

This is a fan-made tool for the Arc Raiders community. Contributions are welcome!

## License

This project is not affiliated with or endorsed by Embark Studios or Arc Raiders.

## Acknowledgments

- Embark Studios for creating Arc Raiders
- Community sources: arcraidershub.com, arcraiderskill.com
- Arc Raiders community for feedback and skill data


