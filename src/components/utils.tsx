function Header() {
  return (
    <div className='header'>
      <a href={'https://www.ankurkedia.com/'} target='_blank' rel='noreferrer'>
        How to play
      </a>
      <a
        href={'https://github.com/theankurkedia/tapp'}
        target='_blank'
        rel='noreferrer'
      >
        source
      </a>
      <a href={'https://www.ankurkedia.com/'} target='_blank' rel='noreferrer'>
        about
      </a>
    </div>
  );
}

function Footer() {
  return (
    <div className='footer'>
      Made by{' '}
      <a href={'https://www.ankurkedia.com/'} target='_blank' rel='noreferrer'>
        ankur
      </a>
    </div>
  );
}

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

export { Header, Footer, Overlay };
