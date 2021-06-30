import React from 'react';
import Game from './components/Game';
import Login from './components/Login';
import socketClient, { Socket } from 'socket.io-client';

// TODO: pick it up from env
const ENDPOINT = 'http://127.0.0.1:8080';

const socket: Socket = socketClient(ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  const [loginData, setLoginData] = React.useState<{
    users?: Array<any>;
    user?: string;
    room?: string;
  }>({});
  return (
    <>
      {!(loginData.room && loginData.users && loginData.users.length > 1) ? (
        <Login setLoginData={setLoginData} socket={socket} />
      ) : (
        <Game socket={socket} />
      )}
    </>
  );
}

export default App;
