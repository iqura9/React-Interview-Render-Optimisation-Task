import { memo } from 'react';

export type ISquare = {
  id: string;
  color: string;
};

type SquareProps = {
  onClick?: (id: string) => void;
} & ISquare;

export function Square({ id, color, onClick }: SquareProps) {
  console.log(`render ${id}`);
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        background: color,
        cursor: 'pointer',
      }}
      onClick={() => onClick?.(id)}
    />
  );
}

export const SquareWithMemo = memo(Square);
