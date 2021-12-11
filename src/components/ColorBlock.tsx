import React from 'react';

function ColorBlock({
  color,
  height,
  alignment,
  onClick,
  username = '',
}: {
  color: string;
  height: number;
  alignment: 'top' | 'bottom';
  onClick?: () => void;
  username?: string;
}) {
  return (
    <div
      className='color-block'
      style={{
        backgroundColor: color,
        height: height + '%',
      }}
      onClick={() => {
        onClick ? onClick() : null;
      }}
    >
      <div
        style={{
          top: alignment === 'top' ? 10 : undefined,
          bottom: alignment === 'bottom' ? 10 : undefined,
          visibility: username ? 'visible' : 'hidden',
        }}
        className='name-tag'
      >
        {username}
      </div>
    </div>
  );
}

export default React.memo(ColorBlock);
