import React from 'react';
import { SocketContext } from '../context';
import { GameDataType } from '../types';
import { COLORS } from '../constants';
import Result from './Result';
import ColorBlock from './ColorBlock';

function Game({
  gameData,
  resetGameData,
}: {
  gameData: GameDataType;
  resetGameData: () => void;
}) {
  const socket = React.useContext(SocketContext);
  const [score, setScore] = React.useState(50);
  const [winner, setWinner] = React.useState<'opponent' | 'local' | null>();

  const tickOpponent = React.useCallback(() => {
    setScore((prevScore) => prevScore - 2);
  }, []);

  const reset = React.useCallback(() => {
    setScore(50);
    resetGameData();
    setWinner(null);
  }, [resetGameData]);

  const tickLocal = () => {
    if (score < 98) {
      socket?.emit('updateScore', {}, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
      setScore((prevScore) => prevScore + 2);
    } else {
      socket?.emit('gameOver', {}, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
      setWinner('local');
    }
  };

  React.useEffect(() => {
    socket?.on('message', ({ type }: { type: string }) => {
      switch (type) {
        case 'scoreUpdated':
          tickOpponent();
          break;
        case 'announceWinner':
          setWinner('opponent');
          break;
        case 'resetGame':
          reset();
          break;
        default:
          break;
      }
    });
  }, [socket, tickOpponent, reset]);
  return (
    <div className='game'>
      {winner ? (
        <Result reset={reset} winner={winner} />
      ) : (
        <>
          <ColorBlock
            height={100 - score}
            color={COLORS.opponent}
            username={gameData.opponentUser}
            alignment='top'
          />
          <ColorBlock
            height={score}
            color={COLORS.local}
            username={gameData.localUser}
            alignment='bottom'
            onClick={tickLocal}
          />
        </>
      )}
    </div>
  );
}

export default React.memo(Game);
