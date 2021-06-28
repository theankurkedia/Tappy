import React from 'react';

const COLORS = {
  Red: '#e11d48',
  Blue: '#2563eb',
};

function App() {
  const [values, setValues] = React.useState({ red: 50, blue: 50 });
  const [result, setResult] = React.useState<string | null>();

  const handlePress = (color: 'Red' | 'Blue') => {
    if (color === 'Red') {
      if (values.blue >= 2) {
        setValues({ red: values.red + 2, blue: values.blue - 2 });
      } else {
        setValues({ red: 50, blue: 50 });
        setResult('Red');
      }
    } else {
      if (values.red >= 2) {
        setValues({ red: values.red - 2, blue: values.blue + 2 });
      } else {
        setValues({ red: 50, blue: 50 });
        setResult('Blue');
      }
    }
  };
  return (
    <div style={{ position: 'absolute', height: '100vh', width: '100vw' }}>
      {result ? (
        <div
          style={{
            backgroundColor: COLORS[result === 'Red' ? 'Red' : 'Blue'],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <h6
            style={{
              color: 'white',
              fontSize: '1.5rem',
              margin: 10,
              pointerEvents: 'none',
            }}
          >{`${result} wins`}</h6>
          <button
            onClick={() => setResult(null)}
            className='button'
            style={{
              fontSize: '1rem',
              padding: 10,
              backgroundColor: COLORS[result === 'Red' ? 'Blue' : 'Red'],
              width: '100',
              color: 'white',
              borderWidth: 0,
              fontWeight: 700,
              borderRadius: 10,
              height: 40,
            }}
          >
            Play again?
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundColor: COLORS.Red,
              height: values.red + '%',
              transitionProperty: 'height',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            }}
            onClick={() => handlePress('Red')}
          />
          <div
            style={{
              backgroundColor: COLORS.Blue,
              height: values.blue + '%',
              transitionProperty: 'height',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            }}
            onClick={() => handlePress('Blue')}
          />
        </>
      )}
    </div>
  );
}

export default App;
