import React from 'react';
import Header from '../components/Header';
import styles from './Hero.module.css'

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Video Background */}
      <div className={styles.videoBackground}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.backgroundVideo}
        >
          <source src="/assets/bg-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Blue Overlay */}
        <div className={styles.blueOverlay}></div>
      </div>
      
      <Header />
      <div className={styles.heroSec}>
        <div className={styles.text}>
          <h1 id={styles.maintext}>Integrated <br/> Innovation</h1>
          <p id={styles.para}>Your Trusted Partner in Integrated Network and Security Solutions.</p>
          <button id={styles.btnTalk} onClick={() => {
          const el = document.getElementById('contacts');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}>Let's Talk</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;