import { useEffect } from 'react';
import { Header } from './components/Header';
import { SkillTreeView } from './components/SkillTreeView';
import { BuildSummary } from './components/BuildSummary';
import { RadarChart } from './components/RadarChart';
import { useSkillTreeStore } from './store/skillTreeStore';

function App() {
  const undo = useSkillTreeStore(state => state.undo);
  const redo = useSkillTreeStore(state => state.redo);
  const canUndo = useSkillTreeStore(state => state.canUndo);
  const canRedo = useSkillTreeStore(state => state.canRedo);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey && canUndo()) {
        e.preventDefault();
        undo();
      }
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        if (canRedo()) {
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <div className="min-h-screen bg-gunmetal scanlines grain">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Main Skill Tree Area */}
          <div className="flex-1">
            <SkillTreeView />
          </div>

          {/* Right Sidebar - Summary and Radar */}
          <aside className="w-96 space-y-6">
            <BuildSummary />
            <RadarChart />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal border-t-2 border-panel-border p-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-secondary text-xs font-mono">
            ARC RAIDERS SKILL TREE BUILDER v1.0.0
          </p>
          <p className="text-text-secondary text-xs mt-1 opacity-60">
            Unofficial fan-made tool • Not affiliated with Embark Studios
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;


