import React from 'react';

function Footer() {
  return (
    <div className='footer'>
      Made by{' '}
      <a href={'https://www.ankurkedia.com/'} target='_blank' rel='noreferrer'>
        Ankur
      </a>
    </div>
  );
}

export default React.memo(Footer);
