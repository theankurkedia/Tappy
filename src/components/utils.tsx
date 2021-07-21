function Header() {
  return (
    <div className='header'>
      <div className='tooltip'>
        About
        <span className='tooltiptext glassmorphed'>
          Tapp is a two player game. The players have to tap on their portion of
          screen and the player to cover the screen with her/his color wins.
        </span>
      </div>
      <div className='tooltip'>
        How to play?
        <span className='tooltiptext glassmorphed'>
          Just enter your name. Join the room. Share the room id with the other
          player and start tapping.
        </span>
      </div>
      <a
        href={'https://github.com/theankurkedia/tapp'}
        target='_blank'
        rel='noreferrer'
      >
        Source
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
