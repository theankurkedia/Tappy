import React from 'react';
import { SocketContext } from '../context';
import { GameDataType } from '../types';
import { getUser } from '../utils';
import Footer from './Footer';
import Header from './Header';
import LoginForm from './LoginForm';
import Waiting from './Waiting';

/**
 *
 * @returns Component showing either the waiting timer or the login form
 */
function DetailsOverlay({
  setGameData,
  isOverlayVisible,
  loggedIn,
  setLoggedIn,
}: {
  setGameData: (val: GameDataType) => void;
  isOverlayVisible: boolean;
  loggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
}) {
  const socket = React.useContext(SocketContext);
  const [localUser, setLocalUser] = React.useState(getUser());
  const [opponentUser, setOpponentUser] = React.useState<string>();
  const [room, setRoom] = React.useState<string>(
    Math.floor(Math.random() * 10000).toString()
  );

  const gameListener = React.useCallback(
    (data: { users: Array<any>; room: string }) => {
      const otherUser: { name: string; room: string } = data.users.filter(
        (usr) => usr.name !== localUser
      )[0];
      setOpponentUser(otherUser?.name || 'Opponent');
      setTimeout(() => {
        setGameData({
          ...data,
          localUser: localUser,
          opponentUser: otherUser?.name || 'Opponent',
        });
      }, 5000);
    },
    [localUser, setGameData]
  );

  React.useEffect(() => {
    socket?.on('startGame', gameListener);
    return () => {
      socket?.off('startGame', gameListener);
    };
  }, [socket, gameListener]);

  return (
    <div
      className='overlay'
      style={{
        visibility: !isOverlayVisible ? 'hidden' : undefined,
      }}
    >
      <Header />
      {loggedIn ? (
        <Waiting room={room} opponentUser={opponentUser} />
      ) : (
        <LoginForm
          setLoggedIn={setLoggedIn}
          user={localUser}
          setUser={setLocalUser}
          room={room}
          setRoom={setRoom}
        />
      )}
      <Footer />
    </div>
  );
}

export default React.memo(DetailsOverlay);
