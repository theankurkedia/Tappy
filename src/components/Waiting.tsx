import React from 'react';

function Waiting({
  room,
  opponentUser,
}: {
  room: string;
  opponentUser?: string;
}) {
  const [timer, setTimer] = React.useState<number>(5);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (opponentUser) {
      interval = setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [opponentUser]);

  return (
    <div className='login_wrapper glassmorphed'>
      {opponentUser ? (
        <>
          <div className='waiting-display'>{opponentUser} joined.</div>
          <div>Game begins in {timer}...</div>
        </>
      ) : (
        <>
          <div className='waiting-display'>Your room id is: {room}</div>
          <div>Waiting for the other user to join.</div>
        </>
      )}
    </div>
  );
}

export default React.memo(Waiting);
