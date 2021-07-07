import React from 'react';
import { Socket } from 'socket.io-client';
import { saveUser } from '../utils';

export default function LoginForm({
  socket,
  setLoggedIn,
  room,
  setRoom,
  user,
  setUser,
}: {
  socket: Socket;
  setLoggedIn: Function;
  room: string;
  setRoom: Function;
  user?: string;
  setUser: Function;
}) {
  const inputRef = React.useRef<any>();

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
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
    <div className='login_wrapper'>
      <div className='input_field_wrapper'>
        <label className='input'>
          <input
            className='input_field'
            type='text'
            placeholder=' '
            value={user}
            onChange={(e: any) => setUser(e.target.value)}
            ref={inputRef}
          />
          <span className='input_label'>Name</span>
        </label>
      </div>
      <div className='input_field_wrapper'>
        <label className='input'>
          <input
            className='input_field'
            type='text'
            placeholder=' '
            value={room}
            onChange={(e: any) => setRoom(e.target.value)}
          />
          <span className='input_label'>Room</span>
        </label>
      </div>
      <button onClick={handleClick} className='login-button button-ripple'>
        Login
      </button>
    </div>
  );
}
