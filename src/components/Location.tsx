import React, { useEffect, useRef, useState } from 'react';
import styles from './Location.module.css';

const API_BASE = "https://www.rcccabling.com.ph/api";

interface CompanyInfo {
  address: string;
  map: string; // URL for Google Maps embed
}

const Location: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch address and map from company_info table
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await fetch(`${API_BASE}/company_info.php`);
        const data = await res.json();
        if (data && data.length > 0) {
          setCompanyInfo(data[0]);
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  // ✅ Animate elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setTimeout(() => {
              target.classList.add('animate-in');
            }, parseInt(target.dataset.delay || '0'));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = [titleRef.current, addressRef.current, mapRef.current, footerRef.current];
    elements.forEach((el) => el && observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.locationSection}>
      <div className={styles.contentWrapper}>
        {/* Title */}
        <div 
          ref={titleRef}
          className={`${styles.textContainer} ${styles.animateTitle}`}
          data-delay="0"
        >
          <h3>OUR LOCATION</h3>
          <p className={styles.subtitle}>
            Visit us to experience our expert solutions and professional service.
          </p>
        </div>

        {/* Address */}
        <div 
          ref={addressRef}
          className={`${styles.address} ${styles.animateOnScroll}`}
          data-delay="200"
        >
          {loading ? (
            <strong>Loading address...</strong>
          ) : (
            <strong>{companyInfo?.address || "Address not available"}</strong>
          )}
        </div>

        {/* Map */}
        <div 
          ref={mapRef}
          className={`${styles.mapContainer} ${styles.animateMap}`}
          data-delay="400"
        >
          {loading ? (
            <p>Loading map...</p>
          ) : (
            <iframe
              title="Google Map"
              src={companyInfo?.map || "https://www.google.com/maps?q=Philippines&output=embed"}
              width="100%"
              height="300"
              loading="lazy"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </div>

        {/* Footer */}
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
