import { useState } from 'react';
import Grid from './components/common/Grid';
import Keyboard from './components/common/Keyboard';
import { getTileStates } from './core/game/Coloring';

function App() {
  const [mode, setMode] = useState<'og' | 'go'>('og');
  const [solution] = useState('CRANE'); // demo word
  const [currentGuess, setCurrentGuess] = useState('');
  const [board, setBoard] = useState(Array(6).fill(null).map(() => ({
    tiles: Array(5).fill({ letter: '', state: 'empty' as const })
  })));

  const handleKeyPress = (key: string) => {
    if (key === 'ENTER') {
      if (currentGuess.length === 5) {
        const newRow = {
          tiles: currentGuess.split('').map((letter, i) => ({
            letter,
            state: getTileStates(currentGuess, solution)[i]
          }))
        };
        setBoard(prev => {
          const newBoard = [...prev];
          newBoard[0] = newRow;
          return newBoard;
        });
        setCurrentGuess('');
      }
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-8">
      <h1 className="text-5xl font-bold mb-8 tracking-widest">brrrdle</h1>
      
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode('og')}
          className={`px-6 py-3 rounded-full text-lg font-medium ${mode === 'og' ? 'bg-green-600' : 'bg-gray-800'}`}
        >
          og
        </button>
        <button
          onClick={() => setMode('go')}
          className={`px-6 py-3 rounded-full text-lg font-medium ${mode === 'go' ? 'bg-green-600' : 'bg-gray-800'}`}
        >
          go
        </button>
      </div>

      <div className="mb-8">
        <Grid rows={board} currentRow={0} wordLength={5} />
      </div>

      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
