import React, { useEffect, useRef } from 'react';
import { Landmark } from 'lucide-react';

const Location = ({ t }) => {
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
    <section className="location-section light-section">
      <div className="container reveal" ref={revealRef}>
        <div className="venue-icon">
          <Landmark size={150} color="#db2735" strokeWidth={0.8} />
        </div>
        
        <h2 className="location-title">{t.title}</h2>
        
        <div className="venue-details">
          <h3 style={{ whiteSpace: 'pre-line' }}>{t.venue}</h3>
          <p>{t.address}</p>
        </div>
        
        <div className="map-buttons">
          <a href="https://yandex.uz/maps/-/CTUb7Int" target="_blank" rel="noreferrer" className="outline-btn">
            {t.yandex}
          </a>
          <a href="https://maps.app.goo.gl/c88rYRJHybLk1qKc6" target="_blank" rel="noreferrer" className="outline-btn">
            {t.google}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Location;
