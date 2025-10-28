import React, { useEffect, useState } from 'react';
import styles from './Partners.module.css';

const API_BASE = "https://www.rcccabling.com.ph/api";

interface Partner {
  id: number;
  name: string;
  image: string;
}

const PartnerSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(`${API_BASE}/partners.php`);
        const data = await res.json();
        // Sort partners alphabetically by name
        const sortedPartners = (data || []).sort((a: Partner, b: Partner) => 
          a.name.localeCompare(b.name)
        );
        setPartners(sortedPartners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className={styles.partnersSection}>
      {/* Animated background circuit pattern */}
      <div className={styles.circuitBg}>
        <div className={`${styles.circuitLine} ${styles.circuitLine1}`}></div>
        <div className={`${styles.circuitLine} ${styles.circuitLine2}`}></div>
        <div className={`${styles.circuitLine} ${styles.circuitLine3}`}></div>
        <div className={`${styles.circuitDot} ${styles.circuitDot1}`}></div>
        <div className={`${styles.circuitDot} ${styles.circuitDot2}`}></div>
        <div className={`${styles.circuitDot} ${styles.circuitDot3}`}></div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <p className={styles.titleSmall}>Our Partners</p>
          <h2 className={styles.titleBig}>Trusted Brands</h2>
          <div className={styles.subtitle}>
            Working with industry leaders to deliver cutting-edge solutions
          </div>
        </div>

        <div className={styles.logosContainer}>
          {loading ? (
            <div className={styles.loadingState}>
              <p>Loading partners...</p>
            </div>
          ) : partners.length > 0 ? (
            <div className={styles.logosGrid}>
              {partners.map((partner, index) => (
                <div 
                  key={partner.id} 
                  className={styles.logoWrapper}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  title={partner.name}
                >
                  <div className={styles.logoInner}>
                    <img 
                      src={partner.image} 
                      alt={`${partner.name} logo`} 
                      className={styles.logoImg} 
                    />
                    <div className={styles.logoGlow}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No partners available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;