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
    Math.floor(Math.random() * 10000).toString()
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
  }, [socket, setLoginData]);

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
    <Overlay visible={!loggedIn}>
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
              disabled={loggedIn}
            />
            <span className='input_label'>Name</span>
          </label>
        </div>
        <div className='input_field_wrapper'>
          <label className='input'>
            <input
              className='input_field'
              type='text'
              value={room}
              onChange={(e: any) => setRoom(e.target.value)}
              readOnly
            />
            <span className='input_label'>Room</span>
          </label>
        </div>
        <button onClick={handleClick} className='login-button'>
          Login
        </button>
        {loggedIn ? <div>"Waiting for the other user to join..."</div> : null}
      </div>
    </Overlay>
  );
}

function Overlay({ children, visible }: { children: any; visible: boolean }) {
  return (
    <div
      className='overlay'
      style={{
        visibility: !visible ? 'hidden' : undefined,
      }}
    >
      {children}
    </div>
  );
}
