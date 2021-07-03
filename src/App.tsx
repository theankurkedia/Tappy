import React from 'react';
import Game from './components/Game';
import Login from './components/Login';
import socketClient, { Socket } from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || '';

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
      <Game socket={socket} />
      {!(loginData.room && loginData.users && loginData.users.length > 1) ? (
        <Login setLoginData={setLoginData} socket={socket} />
      ) : null}
    </>
  );
}

export default App;
