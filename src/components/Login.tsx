import React from 'react';
import { Socket } from 'socket.io-client';

export default function Login({
  socket,
  setLoggedIn,
}: {
  socket: Socket;
  setLoggedIn: Function;
}) {
  const [user, setUser] = React.useState('');
  const [room, setRoom] = React.useState<string>(
    // TODO: add more zeroes
    Math.floor(Math.random() * 100).toString()
  );
  const handleClick = () => {
    socket.emit('login', { name: user, room }, ({ error, success }: any) => {
      if (error) {
        console.log(error);
      } else if (success) {
        setLoggedIn({ user, room });
      }
    });
  };
  return (
    <div className='wrapper'>
      <input value={user} onChange={(e) => setUser(e.target.value)} />
      <input value={room} onChange={(e) => setRoom(e.target.value)} />
      <button onClick={handleClick}>Login</button>
    </div>
  );
}
