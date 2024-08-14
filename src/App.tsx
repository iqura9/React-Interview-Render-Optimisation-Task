import './App.css';
import { SquareWithMemo } from './Square.tsx';
import { useUpdateSquare } from './useUpdateSquare.tsx';

function App() {
  const { squares, handleClick } = useUpdateSquare();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {squares.map((square) => (
        <SquareWithMemo
          key={square.id}
          id={square.id}
          color={square.color}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

export default App;
