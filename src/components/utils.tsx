import React from 'react';
import Footer from './Footer';
import Header from './Header';

function Overlay({ children, visible }: { children: any; visible: boolean }) {
  return (
    <div
      className='overlay'
      style={{
        visibility: !visible ? 'hidden' : undefined,
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export { Overlay };
