import React from 'react';
import { Socket } from 'socket.io-client';
import { getUser, saveUser } from '../utils';

export default function Login({
  socket,
  setLoginData,
}: {
  socket: Socket;
  setLoginData: Function;
}) {
  const inputRef = React.useRef<any>();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(getUser());
  const [room, setRoom] = React.useState<string>(
    Math.floor(Math.random() * 1000000).toString()
  );

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    socket.on(
      'startGame',
      (data: { user: string; users: Array<any>; room: string }) => {
        setLoginData(data);
      }
    );
  }, []);

  const handleClick = () => {
    if (user && room) {
      socket.emit('login', { name: user, room }, ({ error, success }: any) => {
        if (error) {
          console.log(error);
        } else if (success) {
          setLoggedIn(true);
          saveUser(user);
        }
      });
    }
  };

  return (
    <div className='wrapper'>
      <input
        value={user}
        onChange={(e: any) => setUser(e.target.value)}
        type='text'
        ref={inputRef}
        disabled={loggedIn}
      />
      <input
        value={room}
        onChange={(e: any) => setRoom(e.target.value)}
        disabled={loggedIn}
      />
      <button onClick={handleClick} disabled={loggedIn}>
        Login
      </button>
      {loggedIn ? <div>"Waiting for the other user to join..."</div> : null}
    </div>
  );
}
