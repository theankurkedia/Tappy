import React from 'react';
import { SocketContext } from '../context';
import { saveUser } from '../utils';
import InputField from './InputField';

export default function LoginForm({
  setLoggedIn,
  room,
  setRoom,
  user,
  setUser,
}: {
  room: string;
  user?: string;
  setRoom: (val: string) => void;
  setLoggedIn: (val: boolean) => void;
  setUser: (val: string) => void;
}) {
  const inputRef = React.useRef<any>();
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const loginUser = () => {
    if (user && room) {
      socket?.emit('login', { name: user, room }, ({ error, success }: any) => {
        if (error) {
          console.log(error);
        } else if (success) {
          setLoggedIn(true);
          saveUser(user);
        }
      });
    }
  };

  const isButtonDisabled = !user || !room;
  return (
    <div className='login_wrapper glassmorphed'>
      <InputField
        label='Name'
        value={user}
        setValue={setUser}
        inputRef={inputRef}
      />
      <InputField label='Room' value={room} setValue={setRoom} />
      <button
        onClick={loginUser}
        className={`login-button button-ripple`}
        disabled={isButtonDisabled}
      >
        Join
      </button>
    </div>
  );
}
