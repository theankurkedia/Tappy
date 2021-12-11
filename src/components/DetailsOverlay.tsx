import React from 'react';
import { SocketContext } from '../context';
import { getUser } from '../utils';
import LoginForm from './LoginForm';
import Overlay from './Overlay';
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
  setGameData: (val: any) => void;
  isOverlayVisible: boolean;
  loggedIn: boolean;
  setLoggedIn: (val: any) => void;
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
    <Overlay visible={isOverlayVisible}>
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
    </Overlay>
  );
}

export default React.memo(DetailsOverlay);
