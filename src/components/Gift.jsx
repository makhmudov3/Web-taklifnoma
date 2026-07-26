import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Gift = ({ t }) => {
  const revealRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setStatus('loading');
    const BOT_TOKEN = '8771677955:AAHjkGG9rtHQoEjssyF_OWJgNMFUZXD3JNo';
    const CHAT_ID = '6205699347';
    const text = `🎉 Yangi tilak!\n\n👤 Ism: ${name}\n💬 Tilak: ${message}`;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setName('');
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="gift-section light-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <div className="container reveal" ref={revealRef}>
        <h2 className="location-title">{t.title}</h2>
        
        <div style={{ marginBottom: '50px' }}>
          <p style={{ margin: '0 auto 20px', maxWidth: '400px', fontSize: '1.15rem', color: '#333', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {t.p1}
          </p>
          <p style={{ margin: '0 auto', maxWidth: '400px', fontSize: '1.15rem', color: '#333', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {t.p2}
          </p>
        </div>

        <div className="wishes-card">
          <p style={{ fontSize: '1.15rem', color: '#333', marginBottom: '35px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {t.p3}
          </p>
          <button onClick={() => setIsOpen(true)} className="outline-btn" style={{ width: '100%', maxWidth: '300px', margin: '0 auto', cursor: 'pointer', display: 'block' }}>
            {t.btn}
          </button>
        </div>
      </div>

      {isOpen && createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
            <h3>{t.modalTitle}</h3>
            
            {status === 'success' ? (
              <div className="success-msg">
                {t.success}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder={t.namePlaceholder} 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
                <textarea 
                  placeholder={t.msgPlaceholder} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                  rows="4"
                />
                <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? t.submitting : t.submit}
                </button>
                {status === 'error' && <p className="error-text">{t.error}</p>}
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Gift;
