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
  }, []);

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
    socket.on('scoreUpdated', ({ user: userName }) => {
      if (user !== userName) {
        tickOpponent();
      }
    });

    socket.on('announceWinner', ({ user: userName }) => {
      if (user !== userName) {
        setResult('opponent');
      }
    });

    socket.on('resetGame', ({ user: userName }) => {
      if (user !== userName) {
        reset();
      }
    });
  }, [socket, user, tickOpponent]);

  return (
    <div className='game'>
      {result ? (
        <div
          style={{
            backgroundColor:
              COLORS[result === 'opponent' ? 'opponent' : 'local'],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <h6
            style={{
              color: 'white',
              fontSize: '1.5rem',
              margin: 10,
              pointerEvents: 'none',
            }}
          >{`You ${result === 'local' ? 'won' : 'lost'}!`}</h6>
          <button
            onClick={() => {
              socket.emit('reset', {}, (error: any) => {
                if (error) {
                  console.log(error);
                }
              });
              reset();
            }}
            className='button'
            style={{
              fontSize: '1rem',
              padding: 10,
              backgroundColor:
                COLORS[result === 'opponent' ? 'local' : 'opponent'],
              width: '100',
              color: 'white',
              borderWidth: 0,
              fontWeight: 700,
              borderRadius: 10,
              height: 40,
              cursor: 'pointer',
            }}
          >
            Play again?
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundColor: COLORS.opponent,
              height: 100 - score + '%',
              transitionProperty: 'height',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            }}
          />
          <div
            style={{
              backgroundColor: COLORS.local,
              height: score + '%',
              transitionProperty: 'height',
              transitionDuration: '200ms',
              transitionTimingFunction: 'ease-out',
            }}
            onClick={tickLocal}
          />
        </>
      )}
    </div>
  );
}

export default Game;
