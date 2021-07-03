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
  return (
    <>
      <Game socket={socket} gameData={gameData} />
      <Login socket={socket} setGameData={setGameData} gameData={gameData} />
    </>
  );
}

export default App;
