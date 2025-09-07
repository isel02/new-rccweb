import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
        }
      });
    }, observerOptions);

    const elements = [heroRef.current, contentRef.current, statsRef.current, cardsRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <img src="/assets/RCC-Logo.png" alt="RCC Logo" className={styles.logo} />
          </div>
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
            <Link to="/careers">Careers</Link>
            <button className={styles.contactBtn}>Contact Us</button>
          </nav>
        </div>
      </header>

      <main className={styles.container}>
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Connecting Systems.<br />
              Powering Innovation.
            </h1>
            <p className={styles.heroSubtitle}>
              Your Trusted Partner in Integrated Network and Security Solutions.
            </p>
          </div>
        </section>

        {/* Company Stats */}
        <section ref={statsRef} className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>18</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>240+</div>
              <div className={styles.statLabel}>Completed Projects</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>9.5/10</div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>150+</div>
              <div className={styles.statLabel}>Clients Served</div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className={styles.content}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>OUR COMPANY</h2>
              
              <p className={styles.description}>
                <strong>RCC Cabling and Network Solutions Corporation</strong> is a trusted system integrator specializing in advanced IT and auxiliary systems. We design and implement smart infrastructure solutions across broadcast, security, and network technologies — empowering businesses with reliable, future-ready systems.
              </p>

              <p className={styles.description}>
                We focus on the design, planning, and implementation of smart infrastructure across broadcast, security, and network systems. Our commitment to quality has made us a preferred partner for businesses seeking reliable integration services.
              </p>

              <p className={styles.description}>
                RCC proudly installs and resells world-class products from industry leaders such as LS, Alantek, Fluke Networks, Hikvision, Cisco, Bosch, Panasonic, and more. From structured cabling and CCTV to fiber optics, PABX, FDAS, and audio systems — we build future-ready solutions tailored to your needs.
              </p>
            </div>

            <div className={styles.imageContent}>
              <img
                src="/assets/company.jpg"
                alt="Network Infrastructure"
                className={styles.contentImage}
              />
            </div>
          </div>
        </section>

        {/* Mission, Vision, Goals Cards */}
        <section ref={cardsRef} className={styles.cardsSection}>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎯</div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardText}>
                To become one of the leading System Integrators in the Philippines, recognized for innovation and excellence in integrated network solutions.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🚀</div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardText}>
                To be one of the pioneers in System Integration industry in the Philippines, providing cutting-edge products and services in Structured Cabling, CCTV, Telecommunications, FDAS and Audio Systems.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>⭐</div>
              <h3 className={styles.cardTitle}>Our Goal</h3>
              <p className={styles.cardText}>
                To provide customers with durable, reliable and modern equipment as well as future-proof infrastructure. We use premium materials and tools to offer quick, reliable solutions while building lasting relationships.
              </p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>&copy; 2025 RCC CABLING AND NETWORK SOLUTIONS CORPORATION. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default About;