import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import EntryScreen from './components/EntryScreen';
import Hero from './components/Hero';
import Message from './components/Message';
import Calendar from './components/Calendar';
import Timer from './components/Timer';
import Location from './components/Location';
import Gift from './components/Gift';
import MusicToggle from './components/MusicToggle';
import { translations } from './utils/translations';
import bgMusic from './assets/rishat.mp3';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('UZ');
  const audioRef = useRef(null);

  const t = translations[lang];

  // Auto-play logic is handled inside EntryScreen when unlocked
  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log('Autoplay prevented', e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Entry Screen Overlay */}
      <EntryScreen 
        isUnlocked={isUnlocked} 
        onUnlock={handleUnlock} 
        startMusic={startMusic} 
        toggleMusic={toggleMusic}
        isPlaying={isPlaying}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src={bgMusic} type="audio/mpeg" />
      </audio>

      {/* Main Content */}
      <main id="main-content" className={!isUnlocked ? 'hidden' : ''}>
        <Hero isUnlocked={isUnlocked} toggleMusic={toggleMusic} isPlaying={isPlaying} lang={lang} setLang={setLang} t={t} />
        <Message t={t.message} />
        <Calendar t={t.calendar} />
        <Timer t={t.timer} />
        <Location t={t.location} />
        <Gift t={t.gift} />
        <footer>
          <p>&copy; 2028 Abdulaziz & Ozodahon</p>
        </footer>
      </main>

      {/* Global Fixed Header */}
      <div className={`floating-header ${isUnlocked ? 'visible' : ''}`}>
        <button className="hero-music-btn" onClick={toggleMusic}>
          {isPlaying ? <Music size={18} color="#fff" strokeWidth={2} /> : <VolumeX size={18} color="#fff" strokeWidth={2} />}
        </button>
        <div className="hero-lang-toggle">
          <span className={`lang-option ${lang === 'RU' ? 'active' : ''}`} onClick={() => setLang('RU')}>RU</span>
          <span className={`lang-option ${lang === 'UZ' ? 'active' : ''}`} onClick={() => setLang('UZ')}>UZ</span>
        </div>
      </div>
    </>
  );
}

export default App;
