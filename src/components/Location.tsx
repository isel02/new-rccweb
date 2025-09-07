import React, { useEffect, useRef } from 'react';
import styles from './Location.module.css';

const Location: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            
            // Add different delays for staggered animation
            setTimeout(() => {
              target.classList.add('animate-in');
            }, parseInt(target.dataset.delay || '0'));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = [titleRef.current, addressRef.current, mapRef.current, footerRef.current];
    
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.locationSection}>
      <div className={styles.contentWrapper}>
        <div 
          ref={titleRef}
          className={`${styles.textContainer} ${styles.animateTitle}`}
          data-delay="0"
        >
          <h3>OUR LOCATION</h3>
          <p className={styles.subtitle}>
            Visit us to provide more services and expert solutions
          </p>
        </div>

        <div 
          ref={addressRef}
          className={`${styles.address} ${styles.animateOnScroll}`}
          data-delay="200"
        >
          <strong>Centro Plaza Condominium, 1103, 49 Sct. Torillo St, Diliman, Quezon City, 1103 Metro Manila</strong>
        </div>

        <div 
          ref={mapRef}
          className={`${styles.mapContainer} ${styles.animateMap}`}
          data-delay="400"
        >
          <iframe
            title="Google Map RCC Cabling"
            src="https://www.google.com/maps?q=Centro+Plaza+Condominium,+49+Sct.+Torillo+St,+Quezon+City&output=embed"
            width="100%"
            height="300"
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <footer 
          ref={footerRef}
          className={`${styles.footer} ${styles.animateOnScroll}`}
          data-delay="600"
        >
          &copy; 2025 RCC CABLING AND NETWORK SOLUTIONS CORPORATION. All rights reserved.
        </footer>
      </div>
    </section>
  );
};

export default Location;