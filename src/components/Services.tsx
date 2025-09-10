import React, { useRef, useEffect, useState } from 'react';
import styles from './Services.module.css';

interface Service {
  title: string;
  img: string;
  summary: string;
  items: string[];
}

const originalData: Service[] = [
  {
    title: 'Fire Detection and Alarm System',
    img: '/assets/services/fdas.jpg',
    summary: 'Complete fire alarm system design, installation and testing.',
    items: [
      'Site Survey and Design',
      'Cable Laying For Fire Alarm System Devices',
      'Installation and Supply of Fire Alarm System Devices',
      'Termination and Configuration of Fire Alarm Devices',
      'Termination, Configuration and Programming of Control Panel',
      'Testing and commissioning of Fire Alarm System Devices',
      'Fixture Setup',
    ],
  },
  {
    title: 'Cable Television (CATV)',
    img: '/assets/services/catv.jpg',
    summary: 'Design and install full CATV systems with fiber and coaxial cables.',
    items: [
      'Alignment and Installation of Satellite System',
      'System Design in both Head and Distribution',
      'Installation of Passive and Active CATV equipment',
      'Activation and Configuration',
      'Cable Laying both Backbone using Fiber Optic Cable and Coaxial Cable',
    ],
  },
  {
    title: 'Fiber Optic',
    img: '/assets/services/fiber_optic.jpg',
    summary: 'Survey, installation, splicing, and testing of fiber optic cables.',
    items: [
      'Site Survey and Design',
      'Cable Laying for Fiber Optic',
      'Fiber Optic Cable Preparation for Termination',
      'Fiber Optic Splicing',
      'Fiber Optic Testing and Commissioning',
    ],
  },
  {
    title: 'Structured Cabling (Data and Voice)',
    img: '/assets/services/structured_cabling.jpg',
    summary: 'End-to-end data and voice cabling including backbone fiber optic.',
    items: [
      'Site Survey and Design',
      'Installation of UTP (CAT5E, CAT6) and Backbone using Fiber Optic Cable',
      'Termination and activation of DATA and Voice',
      'Configuration of Devices (Servers, Switches, Access Point, etc.)',
      'Installation and Supply of all kinds of DATA and Telecommunication Cabinet Rack',
      'Testing and commissioning of DATA and Voice',
    ],
  },
  {
    title: 'CCTV',
    img: '/assets/services/cctv.jpg',
    summary: 'Design, installation and commissioning of CCTV systems and DVR/NVR.',
    items: [
      'Site Survey and Design',
      'Cable Laying for CCTV Cameras',
      'Termination and System Installation of Camera and DVR/NVR',
      'System Configuration of CCTV camera and DVR/NVR',
      'Testing and Activation of CCTV camera and DVR/NVR',
    ],
  },
  {
    title: 'PABX',
    img: '/assets/services/PABX.webp',
    summary: 'Installation and configuration of PABX telephone systems.',
    items: [
      'Site Survey and Design',
      'Cable Laying for PABX System',
      'Termination of telephones and PABX',
      'System Configuration of PABX',
      'Testing and Commissioning of PABX System',
    ],
  },
  {
    title: 'PA (Public Address System)',
    img: '/assets/services/PA.jpg',
    summary: 'Installation and setup of PA systems for clear communication.',
    items: [
      'Site Survey and Design',
      'Termination and Installation of PA system',
      'System Configuration of PA system',
    ],
  },
  {
    title: 'Magnetic Door Lock Access and Biometric System',
    img: '/assets/services/door_access.jpg',
    summary: 'Secure access with magnetic locks and biometric configurations.',
    items: [
      'Site Survey and Design',
      'Termination of Magnetic door locks access',
      'System Configuration of Magnetic door lock access system',
      'System Configuration of Biometric system',
    ],
  },
  {
    title: 'Video Wall and Projector',
    img: '/assets/services/video_wall.jpg',
    summary: 'Supply and installation of video walls and motorized projector screens.',
    items: [
      'Site Survey and Design',
      'Supply and Installation of Video Wall and Projector with Motorized Screen',
    ],
  },
  {
    title: 'Wireless Access Point (WAP) Installation',
    img: '/assets/services/wap.jpg',
    summary: 'Design and install wireless access points with testing and configuration.',
    items: [
      'Site Survey and Design',
      'Supply, Installation and Termination of Wireless Access Point',
      'Configuration and Testing of Wireless Access Point',
    ],
  },
  {
    title: 'Electrical Works',
    img: '/assets/services/electrical.jpg',
    summary: 'Electrical panel installation, wiring, fixtures and testing.',
    items: [
      'Site Survey and Design or implementation based on Client\'s Reference Floor Plan',
      'Cable Laying and Installation of Panel Board',
      'Supply and Installation of Electrical Fixtures, Orbit Fan, etc.',
      'Box Setting for Outlet and Switches',
      'Testing and Commissioning',
    ],
  },
];

const CARD_WIDTH = 280 + 16;

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Repeat data for infinite loop
  const loopedData = [...originalData, ...originalData, ...originalData];
  const middleIndex = originalData.length;

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate visible cards with stagger
          const startIndex = middleIndex; // Start from middle section
          for (let i = 0; i < 5; i++) { // Animate first 5 visible cards
            const cardIndex = startIndex + i;
            if (cardsRef.current[cardIndex]) {
              setTimeout(() => {
                cardsRef.current[cardIndex]?.classList.add(styles.animate);
              }, i * 150);
            }
          }
        }
      });
    }, observerOptions);

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, [middleIndex]);

  // On mount, scroll to the middle
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = middleIndex * CARD_WIDTH;
    }
  }, [middleIndex]);

  // Handle infinite loop illusion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const totalItems = loopedData.length;
      const maxScrollLeft = (totalItems - 1) * CARD_WIDTH;

      if (scrollLeft <= 0) {
        // At start → jump to middle set
        container.scrollLeft = originalData.length * CARD_WIDTH;
      } else if (scrollLeft >= maxScrollLeft - CARD_WIDTH) {
        // At end → jump to middle set
        container.scrollLeft = originalData.length * CARD_WIDTH;
      }

      const index = Math.round(container.scrollLeft / CARD_WIDTH) % originalData.length;
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollBy = (dir: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: dir === 'left' ? -CARD_WIDTH : CARD_WIDTH, behavior: 'smooth' });
  };

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <div 
      className={`${styles.carouselWrapper} ${styles.fadeIn} ${isVisible ? styles.animate : ''}`} 
      id='services'
      ref={wrapperRef}
    >
      <h3>Our Services</h3>
      <h2>What We Offer</h2>
      
      <button className={`${styles.scrollBtn} ${styles.left}`} onClick={() => scrollBy('left')}>
        ❮
      </button>
      
      <div className={styles.carouselContainer} ref={containerRef}>
        {loopedData.map((service, idx) => (
          <div 
            key={idx} 
            className={`${styles.carouselCard} ${styles.reveal}`}
            ref={setCardRef(idx)}
          >
            <img src={service.img} alt={service.title} className={styles.cardImage} />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{service.title}</h3>
              <ul className={styles.serviceList}>
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <button className={`${styles.scrollBtn} ${styles.right}`} onClick={() => scrollBy('right')}>
        ❯
      </button>

      <div className={styles.dots}>
        {originalData.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === activeIndex ? styles.active : ''}`}
            onClick={() => {
              const container = containerRef.current;
              if (!container) return;
              container.scrollTo({
                left: (originalData.length + idx) * CARD_WIDTH,
                behavior: 'smooth',
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;