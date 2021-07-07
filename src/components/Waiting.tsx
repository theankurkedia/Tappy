import { useEffect, useState } from 'react';

export default function Waiting({
  room,
  opponentUser,
}: {
  room: string;
  opponentUser?: string;
}) {
  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    let interval: any;
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
    <div className='login_wrapper'>
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
