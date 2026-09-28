import React, { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

const Calendar = ({ t }) => {
  const revealRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="calendar-section light-section">
      <div className="container reveal" ref={revealRef}>
        <h2>{t.title}</h2>
        <div className="calendar-grid">
          {t.days.map(day => <div key={day} className="day-name">{day}</div>)}
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`empty-${i}`} className="day empty"></div>
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i + 1} className="day">{i + 1}</div>
          ))}
          <div className="day wedding-day">
            <Heart size={44} fill="#db2735" color="#db2735" className="heart-bg" />
            <span className="day-number">8</span>
          </div>
          {Array.from({ length: 23 }, (_, i) => (
            <div key={i + 9} className="day">{i + 9}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
