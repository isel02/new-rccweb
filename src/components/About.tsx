import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = "https://www.rcccabling.com.ph/api";

interface CompanyInfo {
  year_exp: string;
  completed_proj: string;
  ave_rate: string;
  served: string;
  vision: string;
  mission: string;
  goal: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await fetch(`${API_BASE}/company_info.php`);
        const data = await res.json();
        if (data && data.length > 0) {
          setCompanyInfo(data[0]);
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
        }
      });
    }, observerOptions);

    // Observe main section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe text section
    if (textRef.current) {
      observer.observe(textRef.current);
    }

    // Observe stats section
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    // Observe individual stat cards with staggered animation
    statCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${0.2 + index * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const setStatCardRef = (index: number) => (el: HTMLDivElement | null) => {
    statCardsRef.current[index] = el;
  };

  return (
    <section id={styles.about} ref={sectionRef}>
      <div className={`${styles.aboutText} ${styles.fadeInLeft}`} ref={textRef}>
        <h3>Our Company</h3>
        <h1>Connecting Systems. <br />Powering Innovation.</h1>
        <p>
          RCC Cabling and Network Solutions Corporation is a trusted system integrator specializing in advanced IT and auxiliary systems. We design and implement smart infrastructure solutions across broadcast, security, and network technologies — empowering businesses with reliable, future-ready systems.
        </p>
        <button
          className={styles.aboutUs}
          onClick={() => navigate('/about')}
        >
          Read About Us
        </button>
      </div>
      <div className={`${styles.stats} ${styles.fadeInRight}`} ref={statsRef}>
        {loading ? (
          <>
            <div className={`${styles.statCard} ${styles.fadeInUp}`} ref={setStatCardRef(0)}>
              <h2>...</h2>
              <p>Loading</p>
            </div>
            <div className={`${styles.statCard} ${styles.fadeInUp}`} ref={setStatCardRef(1)}>
              <h2>...</h2>
              <p>Loading</p>
            </div>
            <div className={`${styles.statCard} ${styles.fadeInUp}`} ref={setStatCardRef(2)}>
              <h2>...</h2>
              <p>Loading</p>
            </div>
            <div className={`${styles.statCard} ${styles.fadeInUp}`} ref={setStatCardRef(3)}>
              <h2>...</h2>
              <p>Loading</p>
            </div>
          </>
        ) : companyInfo && (
          <>
            <div 
              className={`${styles.statCard} ${styles.fadeInUp}`} 
              ref={setStatCardRef(0)}
            >
              <h2>{companyInfo.year_exp}</h2>
              <p>Years Experience</p>
            </div>
            <div 
              className={`${styles.statCard} ${styles.fadeInUp}`} 
              ref={setStatCardRef(1)}
            >
              <h2>{companyInfo.completed_proj}+</h2>
              <p>Completed Projects</p>
            </div>
            <div 
              className={`${styles.statCard} ${styles.fadeInUp}`} 
              ref={setStatCardRef(2)}
            >
              <h2>{companyInfo.ave_rate}/10</h2>
              <p>Average rating</p>
            </div>
            <div 
              className={`${styles.statCard} ${styles.fadeInUp}`} 
              ref={setStatCardRef(3)}
            >
              <h2>{companyInfo.served}+</h2>
              <p>Served</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default About;