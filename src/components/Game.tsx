import React from 'react';
import { Socket } from 'socket.io-client';
const COLORS = {
  Opponent: '#e11d48',
  Local: '#2563eb',
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

  const reset = () => {
    setScore(50);
  };

  const tickOpponent = React.useCallback(() => {
    if (score >= 2) {
      setScore((prevScore) => prevScore - 2);
    } else {
      reset();
      setResult('Opponent');
    }
  }, []);

  function tickLocal() {
    socket.emit('updateScore', {}, (error: any) => {
      if (error) {
        console.log(error);
      }
    });
    if (score < 98) {
      setScore((prevScore) => prevScore + 2);
    } else {
      reset();
      setResult('Local');
    }
  }

  React.useEffect(() => {
    socket.on('scoreUpdated', ({ user: userName }) => {
      if (user !== userName) {
        tickOpponent();
      }
    });
  }, [socket, user, tickOpponent]);

  console.log('*** 🔥 score', score);
  return (
    <div style={{ position: 'absolute', height: '100vh', width: '100vw' }}>
      {result ? (
        <div
          style={{
            backgroundColor:
              COLORS[result === 'Opponent' ? 'Opponent' : 'Local'],
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
          >{`${result} wins`}</h6>
          <button
            onClick={() => setResult(null)}
            className='button'
            style={{
              fontSize: '1rem',
              padding: 10,
              backgroundColor:
                COLORS[result === 'Opponent' ? 'Local' : 'Opponent'],
              width: '100',
              color: 'white',
              borderWidth: 0,
              fontWeight: 700,
              borderRadius: 10,
              height: 40,
            }}
          >
            Play again?
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundColor: COLORS.Opponent,
              height: 100 - score + '%',
              transitionProperty: 'height',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            }}
          />
          <div
            style={{
              backgroundColor: COLORS.Local,
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
