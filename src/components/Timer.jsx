import React, { useState, useEffect, useRef } from 'react';
import ringImg from '../assets/ring.jpg';

const Timer = ({ t }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const revealRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    
    if (revealRef.current) observer.observe(revealRef.current);
    
    const weddingDate = new Date('2027-08-08T18:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const format = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section className="timer-section light-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <div className="container reveal" ref={revealRef}>
        <h2 className="new-timer-title" style={{ whiteSpace: 'pre-line' }}>{t.title}</h2>
        
        <div className="new-timer-wrapper">
          <div className="new-time-col">
            <span className="num">{format(timeLeft.days)}</span>
            <span className="label">{t.days}</span>
          </div>
          <span className="colon">:</span>
          <div className="new-time-col">
            <span className="num">{format(timeLeft.hours)}</span>
            <span className="label">{t.hours}</span>
          </div>
          <span className="colon">:</span>
          <div className="new-time-col">
            <span className="num">{format(timeLeft.minutes)}</span>
            <span className="label">{t.minutes}</span>
          </div>
          <span className="colon">:</span>
          <div className="new-time-col">
            <span className="num">{format(timeLeft.seconds)}</span>
            <span className="label">{t.seconds}</span>
          </div>
        </div>

        <p className="timer-subtitle">{t.subtitle}</p>

        <img src={ringImg} alt="Ring" style={{ display: 'block', margin: '30px auto 0', maxWidth: '150px', width: '100%', mixBlendMode: 'multiply' }} />
      </div>
    </section>
  );
};

export default Timer;
