import React from 'react';
import Game from './components/Game';
import Login from './components/Login';
import socketClient, { Socket } from 'socket.io-client';
import { LoginDataType } from './types';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || '';

const socket: Socket = socketClient(ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  const [loginData, setLoginData] = React.useState<LoginDataType>({});
  return (
    <>
      <Game socket={socket} />
      <Login
        setLoginData={setLoginData}
        socket={socket}
        loginData={loginData}
      />
    </>
  );
}

export default App;
