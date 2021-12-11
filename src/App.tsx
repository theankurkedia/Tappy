import React from 'react';
import socketClient, { Socket } from 'socket.io-client';
import { DetailsOverlay, Game } from './components';
import { SocketContext } from './context';
import { GameDataType } from './types';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || '';

const socket: Socket = socketClient(ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  const [gameData, setGameData] = React.useState<GameDataType>({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const resetGameData = React.useCallback(() => {
    setLoggedIn(false);
    setGameData({});
  }, []);

  const errorListener = (err: Error) => {
    console.error(`Connection error due to ${err.message}`);
  };

  React.useEffect(() => {
    socket.on('connect_error', errorListener);
    return () => {
      socket.off('connect_error', errorListener);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Game gameData={gameData} resetGameData={resetGameData} />
      <DetailsOverlay
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setGameData={setGameData}
        isOverlayVisible={
          !(gameData.room && gameData.users && gameData.users.length > 1)
        }
      />
    </SocketContext.Provider>
  );
}

export default App;
