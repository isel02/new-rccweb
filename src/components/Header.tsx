import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Smooth scroll handler for in-page anchors
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // prevent default anchor jump
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleContactClick = () => {
    const el = document.getElementById('contacts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Mobile menu portal content
  const mobileMenuPortal = (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Navigation */}
      <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.active : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/about" onClick={closeMobileMenu}>About Us</Link>
        <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
        <Link to="/careers" onClick={closeMobileMenu}>Careers</Link>
        <button className={styles.mobileContactButton} onClick={handleContactClick}>
          Contact Us
        </button>
      </nav>
    </>
  );

  return (
    <>
      <header className={styles.header}>
        <img src="/assets/RCC-Logo.png" alt="RCC Logo" className={styles.logo} />
        
        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <Link to="/careers">Careers</Link>
        </nav>
        
        {/* Desktop Contact Button */}
        <button className={styles.contactButton} onClick={handleContactClick}>
          Contact Us
        </button>

        {/* Hamburger Menu Toggle */}
        <button 
          className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
        </button>
      </header>

      {/* Render mobile menu as portal at document root */}
      {typeof document !== 'undefined' && createPortal(mobileMenuPortal, document.body)}
    </>
  );
};

export default Header;