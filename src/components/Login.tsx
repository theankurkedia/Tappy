import React from 'react';
import { Socket } from 'socket.io-client';
import LoginForm from './LoginForm';
import Waiting from './Waiting';
import { getUser } from '../utils';

export default function Login({
  socket,
  setGameData,
  isOverlayVisible,
  loggedIn,
  setLoggedIn,
}: {
  socket: Socket;
  setGameData: Function;
  isOverlayVisible: boolean;
  loggedIn: boolean;
  setLoggedIn: Function;
}) {
  const [user, setUser] = React.useState(getUser());
  const [opponentUser, setOpponentUser] = React.useState<string>();
  const [room, setRoom] = React.useState<string>(
    Math.floor(Math.random() * 10000).toString()
  );

  React.useEffect(() => {
    socket.on('startGame', (data: { users: Array<any>; room: string }) => {
      let otherUser: { name: string; room: string } = data.users.filter(
        (usr) => usr.name !== user
      )[0];
      setOpponentUser(otherUser?.name || 'Opponent');
      setTimeout(() => {
        setGameData({
          ...data,
          localUser: user,
          opponentUser: otherUser?.name || 'Opponent',
        });
      }, 5000);
    });
    return () => {
      socket.off('startGame');
    };
  }, [user, socket, setGameData]);

  return (
    <Overlay visible={isOverlayVisible}>
      {loggedIn ? (
        <Waiting room={room} opponentUser={opponentUser} />
      ) : (
        <LoginForm
          socket={socket}
          setLoggedIn={setLoggedIn}
          user={user}
          setUser={setUser}
          room={room}
          setRoom={setRoom}
        />
      )}
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
