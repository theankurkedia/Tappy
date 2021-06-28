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
  const [loginData, setLoggedIn] = React.useState<{
    user?: string;
    room?: string;
  }>({});
  return (
    <>
      {!(loginData.room && loginData.user) ? (
        <Login setLoggedIn={setLoggedIn} socket={socket} />
      ) : (
        <Game socket={socket} room={loginData.room} user={loginData.user} />
      )}
    </>
  );
}

export default App;
