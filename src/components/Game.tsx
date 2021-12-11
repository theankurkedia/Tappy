import React from 'react';
import { SocketContext } from '../context';
import { GameDataType } from '../types';

const COLORS = {
  opponent: '#e11d48',
  local: '#2563eb',
};

function Game({
  gameData,
  resetGameData,
}: {
  gameData: GameDataType;
  resetGameData: () => void;
}) {
  const socket = React.useContext(SocketContext);
  const [score, setScore] = React.useState(50);
  const [result, setResult] = React.useState<string | null>();

  const tickOpponent = React.useCallback(() => {
    setScore((prevScore) => prevScore - 2);
  }, []);

  const reset = React.useCallback(() => {
    setScore(50);
    resetGameData();
    setResult(null);
  }, [resetGameData]);

  function tickLocal() {
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
      setResult('local');
    }
  }

  React.useEffect(() => {
    socket?.on('message', ({ type }: { type: string }) => {
      switch (type) {
        case 'scoreUpdated':
          tickOpponent();
          break;
        case 'announceWinner':
          setResult('opponent');
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
      {result ? (
        <div
          className='result-wrapper'
          style={{
            backgroundColor:
              COLORS[result === 'opponent' ? 'opponent' : 'local'],
          }}
        >
          <h6 className='result-text'>{`You ${
            result === 'local' ? 'won' : 'lost'
          }!`}</h6>
          <button
            onClick={() => {
              socket?.emit('reset', {}, (error: any) => {
                if (error) {
                  console.log(error);
                }
              });
              reset();
            }}
            className='play-again button-ripple'
            style={{
              backgroundColor:
                COLORS[result === 'opponent' ? 'local' : 'opponent'],
            }}
          >
            Play again?
          </button>
        </div>
      ) : (
        <>
          <div
            className='color-block'
            style={{
              backgroundColor: COLORS.opponent,
              height: 100 - score + '%',
            }}
          >
            {gameData.opponentUser ? (
              <div
                style={{
                  top: 10,
                }}
                className='name-tag'
              >
                {gameData.opponentUser}
              </div>
            ) : null}
          </div>
          <div
            className='color-block'
            style={{
              backgroundColor: COLORS.local,
              height: score + '%',
            }}
            onClick={tickLocal}
          >
            {gameData.localUser ? (
              <div
                style={{
                  bottom: 10,
                }}
                className='name-tag'
              >
                {gameData.localUser}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
