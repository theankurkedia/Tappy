import React from 'react';
import { Socket } from 'socket.io-client';
const COLORS = {
  opponent: '#e11d48',
  local: '#2563eb',
};

function Game({
  socket,
  room,
  user,
}: {
  socket: Socket;
  room: string;
  user: string;
}) {
  const [score, setScore] = React.useState(50);
  const [result, setResult] = React.useState<string | null>();

  const tickOpponent = React.useCallback(() => {
    if (score >= 2) {
      setScore((prevScore) => prevScore - 2);
    }
  }, [score]);

  const reset = () => {
    setScore(50);
    setResult(null);
  };

  function tickLocal() {
    if (score < 98) {
      socket.emit('updateScore', {}, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
      setScore((prevScore) => prevScore + 2);
    } else {
      socket.emit('gameOver', {}, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
      setResult('local');
    }
  }

  React.useEffect(() => {
    socket.on('scoreUpdated', () => {
      tickOpponent();
    });

    socket.on('announceWinner', () => {
      setResult('opponent');
    });

    socket.on('resetGame', () => {
      reset();
    });
  }, [socket, tickOpponent]);

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
              socket.emit('reset', {}, (error: any) => {
                if (error) {
                  console.log(error);
                }
              });
              reset();
            }}
            className='play-again'
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
          />
          <div
            className='color-block'
            style={{
              backgroundColor: COLORS.local,
              height: score + '%',
            }}
            onClick={tickLocal}
          />
        </>
      )}
    </div>
  );
}

export default Game;
