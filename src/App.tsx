import React from 'react';
import Game from './components/Game';
import Login from './components/Login';
import socketClient, { Socket } from 'socket.io-client';
import { GameDataType } from './types';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || '';

const socket: Socket = socketClient(ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  const [gameData, setGameData] = React.useState<GameDataType>({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <>
      <Game
        socket={socket}
        gameData={gameData}
        resetGameData={() => {
          setLoggedIn(false);
          setGameData({});
        }}
      />
      <Login
        socket={socket}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setGameData={setGameData}
        isOverlayVisible={
          !(gameData.room && gameData.users && gameData.users.length > 1)
        }
      />
    </>
  );
}

export default App;
