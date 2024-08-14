import { useCallback, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { ISquare } from './Square.tsx';

const initState: ISquare[] = [
  {
    id: 'a',
    color: 'red',
  },
  {
    id: 'b',
    color: 'green',
  },
  {
    id: 'c',
    color: 'red',
  },
];

export const useUpdateSquare = () => {
  const [squares, setSquares] = useState<ISquare[]>(initState);
  const [shouldAddSquare, setShouldAddSquare] = useState(false);

  const addSquare = useCallback(() => {
    setSquares((prev) => [...prev, { id: uuid(), color: 'green' }]);
  }, [setSquares]);

  const updateExistingSquare = useCallback(
    (id: string, callback: (isRemoved: boolean) => void) => {
      let isRemovedElement = false;

      const updateSquare = (square: ISquare): ISquare | null => {
        if (square.id === id && square.color === 'red') {
          isRemovedElement = true;
          return null;
        }

        if (square.id === id) {
          return {
            ...square,
            color: 'red',
          };
        }

        return square;
      };

      setSquares((prevSquares) => {
        const updatedSquares = prevSquares
          .map((square) => updateSquare(square))
          .filter((square) => square !== null);

        callback(isRemovedElement);
        return updatedSquares;
      });
    },
    [setSquares]
  );

  const handleClick = useCallback(
    (id: string) => {
      updateExistingSquare(id, (isRemovedElement) => {
        if (!isRemovedElement) {
          setShouldAddSquare(true);
        }
      });
    },
    [setShouldAddSquare, updateExistingSquare]
  );

  useEffect(() => {
    if (shouldAddSquare) {
      addSquare();
    }
    return () => setShouldAddSquare(false);
  }, [shouldAddSquare, addSquare]);

  return {
    squares,
    handleClick,
  };
};
