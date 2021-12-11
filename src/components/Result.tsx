import React from 'react';
import { SocketContext } from '../context';
import { COLORS } from '../constants';

function Result({
  winner,
  reset,
}: {
  winner: 'opponent' | 'local';
  reset: () => void;
}) {
  const socket = React.useContext(SocketContext);
  return (
    <div
      className='result-wrapper'
      style={{
        backgroundColor: COLORS[winner],
      }}
    >
      <h6 className='result-text'>{`You ${
        winner === 'local' ? 'won' : 'lost'
      }!`}</h6>
      <button
        onClick={() => {
          socket?.emit('reset', {}, (error: any) => {
            if (error) {
              console.log(error);
            }
          });
          reset();
        }}
        className='play-again button-ripple'
        style={{
          backgroundColor: COLORS[winner === 'opponent' ? 'local' : 'opponent'],
        }}
      >
        Play again?
      </button>
    </div>
  );
}

export default React.memo(Result);
