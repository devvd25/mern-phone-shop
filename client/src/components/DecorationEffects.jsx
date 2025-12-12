import { useEffect, useState } from 'react';

function SnowEffect() {
  return (
    <div className="snowflakes" aria-hidden="true">
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
    </div>
  );
}

export default function DecorationEffects() {
  const [settings, setSettings] = useState({
    snowEffect: false,
    cornerIcons: {
      topLeft: '',
      topRight: '',
      bottomLeft: '',
      bottomRight: '',
    }
  });

  const loadSettings = () => {
    const saved = localStorage.getItem('site-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({
          snowEffect: parsed.snowEffect || false,
          cornerIcons: parsed.cornerIcons || {
            topLeft: '',
            topRight: '',
            bottomLeft: '',
            bottomRight: '',
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    // Load initial settings
    loadSettings();

    // Listen for settings changes - use custom event
    const handleSettingsChange = () => {
      loadSettings();
    };

    window.addEventListener('settingsChanged', handleSettingsChange);
    window.addEventListener('storage', handleSettingsChange);
    
    // Poll every 2 seconds as fallback
    const interval = setInterval(loadSettings, 2000);

    return () => {
      window.removeEventListener('settingsChanged', handleSettingsChange);
      window.removeEventListener('storage', handleSettingsChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Corner Icons */}
      {settings.cornerIcons.topLeft && (
        <img
          src={settings.cornerIcons.topLeft}
          alt="Top Left Decoration"
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'floatTopLeft 3s ease-in-out infinite'
          }}
        />
      )}

      {settings.cornerIcons.topRight && (
        <img
          src={settings.cornerIcons.topRight}
          alt="Top Right Decoration"
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'floatTopRight 3s ease-in-out infinite 0.5s'
          }}
        />
      )}

      {settings.cornerIcons.bottomLeft && (
        <img
          src={settings.cornerIcons.bottomLeft}
          alt="Bottom Left Decoration"
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'floatBottomLeft 3s ease-in-out infinite 1s'
          }}
        />
      )}

      {settings.cornerIcons.bottomRight && (
        <img
          src={settings.cornerIcons.bottomRight}
          alt="Bottom Right Decoration"
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'floatBottomRight 3s ease-in-out infinite 1.5s'
          }}
        />
      )}

      {/* Snow Effect */}
      {settings.snowEffect && <SnowEffect />}

      {/* Animations */}
      <style>{`
        @keyframes floatTopLeft {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, 10px) rotate(-5deg); }
        }
        @keyframes floatTopRight {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(5deg); }
        }
        @keyframes floatBottomLeft {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -10px) rotate(-5deg); }
        }
        @keyframes floatBottomRight {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(5deg); }
        }
        
        /* Snow Effect */
        .snowflakes {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
          overflow: hidden;
        }
        
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(100px) rotate(360deg);
            opacity: 0.3;
          }
        }
        
        .snowflake {
          position: absolute;
          top: -50px;
          color: #fff;
          font-size: 1.5em;
          user-select: none;
          animation: snowfall linear infinite;
        }
        
        .snowflake:nth-child(1) { left: 2%; animation-duration: 11s; animation-delay: 0s; font-size: 1.2em; }
        .snowflake:nth-child(2) { left: 8%; animation-duration: 13s; animation-delay: 1s; font-size: 1.8em; }
        .snowflake:nth-child(3) { left: 14%; animation-duration: 9s; animation-delay: 2s; font-size: 1em; }
        .snowflake:nth-child(4) { left: 20%; animation-duration: 14s; animation-delay: 0.5s; font-size: 1.5em; }
        .snowflake:nth-child(5) { left: 26%; animation-duration: 10s; animation-delay: 1.5s; font-size: 1.3em; }
        .snowflake:nth-child(6) { left: 32%; animation-duration: 12s; animation-delay: 2.5s; font-size: 1.7em; }
        .snowflake:nth-child(7) { left: 38%; animation-duration: 11s; animation-delay: 0.8s; font-size: 1.1em; }
        .snowflake:nth-child(8) { left: 44%; animation-duration: 13s; animation-delay: 1.8s; font-size: 1.6em; }
        .snowflake:nth-child(9) { left: 50%; animation-duration: 9s; animation-delay: 3s; font-size: 1.4em; }
        .snowflake:nth-child(10) { left: 56%; animation-duration: 14s; animation-delay: 0.3s; font-size: 1.2em; }
        .snowflake:nth-child(11) { left: 62%; animation-duration: 10s; animation-delay: 1.2s; font-size: 1.8em; }
        .snowflake:nth-child(12) { left: 68%; animation-duration: 12s; animation-delay: 2.2s; font-size: 1em; }
        .snowflake:nth-child(13) { left: 74%; animation-duration: 11s; animation-delay: 0.7s; font-size: 1.5em; }
        .snowflake:nth-child(14) { left: 80%; animation-duration: 13s; animation-delay: 1.7s; font-size: 1.3em; }
        .snowflake:nth-child(15) { left: 86%; animation-duration: 9s; animation-delay: 2.8s; font-size: 1.7em; }
        .snowflake:nth-child(16) { left: 92%; animation-duration: 14s; animation-delay: 0.2s; font-size: 1.1em; }
        .snowflake:nth-child(17) { left: 98%; animation-duration: 10s; animation-delay: 1.3s; font-size: 1.6em; }
        .snowflake:nth-child(18) { left: 5%; animation-duration: 12s; animation-delay: 2.3s; font-size: 1.4em; }
        .snowflake:nth-child(19) { left: 11%; animation-duration: 11s; animation-delay: 0.9s; font-size: 1.2em; }
        .snowflake:nth-child(20) { left: 17%; animation-duration: 13s; animation-delay: 1.9s; font-size: 1.8em; }
        .snowflake:nth-child(21) { left: 23%; animation-duration: 9s; animation-delay: 3.1s; font-size: 1em; }
        .snowflake:nth-child(22) { left: 29%; animation-duration: 14s; animation-delay: 0.4s; font-size: 1.5em; }
        .snowflake:nth-child(23) { left: 35%; animation-duration: 10s; animation-delay: 1.4s; font-size: 1.3em; }
        .snowflake:nth-child(24) { left: 41%; animation-duration: 12s; animation-delay: 2.4s; font-size: 1.7em; }
        .snowflake:nth-child(25) { left: 47%; animation-duration: 11s; animation-delay: 0.6s; font-size: 1.1em; }
        .snowflake:nth-child(26) { left: 53%; animation-duration: 13s; animation-delay: 1.6s; font-size: 1.6em; }
        .snowflake:nth-child(27) { left: 59%; animation-duration: 9s; animation-delay: 2.9s; font-size: 1.4em; }
        .snowflake:nth-child(28) { left: 65%; animation-duration: 14s; animation-delay: 0.1s; font-size: 1.2em; }
        .snowflake:nth-child(29) { left: 71%; animation-duration: 10s; animation-delay: 1.1s; font-size: 1.8em; }
        .snowflake:nth-child(30) { left: 77%; animation-duration: 12s; animation-delay: 2.1s; font-size: 1em; }
        .snowflake:nth-child(31) { left: 83%; animation-duration: 11s; animation-delay: 0.5s; font-size: 1.5em; }
        .snowflake:nth-child(32) { left: 89%; animation-duration: 13s; animation-delay: 1.5s; font-size: 1.3em; }
        .snowflake:nth-child(33) { left: 95%; animation-duration: 9s; animation-delay: 2.7s; font-size: 1.7em; }
        .snowflake:nth-child(34) { left: 3%; animation-duration: 14s; animation-delay: 0.6s; font-size: 1.1em; }
        .snowflake:nth-child(35) { left: 9%; animation-duration: 10s; animation-delay: 1.6s; font-size: 1.6em; }
        .snowflake:nth-child(36) { left: 15%; animation-duration: 12s; animation-delay: 2.6s; font-size: 1.4em; }
        .snowflake:nth-child(37) { left: 21%; animation-duration: 11s; animation-delay: 0.8s; font-size: 1.2em; }
        .snowflake:nth-child(38) { left: 27%; animation-duration: 13s; animation-delay: 1.8s; font-size: 1.8em; }
        .snowflake:nth-child(39) { left: 33%; animation-duration: 9s; animation-delay: 3.2s; font-size: 1em; }
        .snowflake:nth-child(40) { left: 39%; animation-duration: 14s; animation-delay: 0.3s; font-size: 1.5em; }
        .snowflake:nth-child(41) { left: 45%; animation-duration: 10s; animation-delay: 1.3s; font-size: 1.3em; }
        .snowflake:nth-child(42) { left: 51%; animation-duration: 12s; animation-delay: 2.3s; font-size: 1.7em; }
        .snowflake:nth-child(43) { left: 57%; animation-duration: 11s; animation-delay: 0.7s; font-size: 1.1em; }
        .snowflake:nth-child(44) { left: 63%; animation-duration: 13s; animation-delay: 1.7s; font-size: 1.6em; }
        .snowflake:nth-child(45) { left: 69%; animation-duration: 9s; animation-delay: 2.8s; font-size: 1.4em; }
        .snowflake:nth-child(46) { left: 75%; animation-duration: 14s; animation-delay: 0.2s; font-size: 1.2em; }
        .snowflake:nth-child(47) { left: 81%; animation-duration: 10s; animation-delay: 1.2s; font-size: 1.8em; }
        .snowflake:nth-child(48) { left: 87%; animation-duration: 12s; animation-delay: 2.2s; font-size: 1em; }
        .snowflake:nth-child(49) { left: 93%; animation-duration: 11s; animation-delay: 0.4s; font-size: 1.5em; }
        .snowflake:nth-child(50) { left: 99%; animation-duration: 13s; animation-delay: 1.4s; font-size: 1.3em; }
      `}</style>
    </>
  );
}
