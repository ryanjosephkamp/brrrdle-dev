import { useState } from 'react';
import Grid from './components/common/Grid';
import Keyboard from './components/common/Keyboard';
import { getTileStates } from './core/game/Coloring';
import { GameRow } from './types/game';

function App() {
  const [mode, setMode] = useState<'og' | 'go'>('og');
  const [solution] = useState('CRANE'); // demo word for testing
  const [board, setBoard] = useState<GameRow[]>(
    Array(6).fill(null).map(() => ({
      tiles: Array(5).fill({ letter: '', state: 'empty' as const })
    }))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'ENTER') {
      if (currentGuess.length === 5) {
        const newTiles = currentGuess.split('').map((letter, i) => ({
          letter,
          state: getTileStates(currentGuess, solution)[i]
        }));

        setBoard(prev => {
          const newBoard = [...prev];
          newBoard[currentRow] = { tiles: newTiles };
          return newBoard;
        });

        setCurrentRow(prev => prev + 1);
        setCurrentGuess('');
      }
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-8 px-4">
      <h1 className="text-5xl font-bold mb-8 tracking-widest text-emerald-400">brrrdle</h1>
      
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode('og')}
          className={`px-8 py-3 rounded-2xl text-xl font-semibold transition-all ${mode === 'og' ? 'bg-emerald-600 shadow-lg scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          og
        </button>
        <button
          onClick={() => setMode('go')}
          className={`px-8 py-3 rounded-2xl text-xl font-semibold transition-all ${mode === 'go' ? 'bg-emerald-600 shadow-lg scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          go
        </button>
      </div>

      <div className="mb-12">
        <Grid rows={board} currentRow={currentRow} wordLength={5} />
      </div>

      <Keyboard onKeyPress={handleKeyPress} />

      <p className="mt-8 text-sm text-gray-500">Type or click the keyboard • Press ENTER to submit</p>
    </div>
  );
}

export default App;
