import React, { useRef, useEffect, useState } from 'react';
import styles from './Services.module.css';

const API_BASE = "https://www.rcccabling.com.ph/api";

interface Service {
  title: string;
  image: string;
  description: string;
}

interface TransformedService {
  title: string;
  img: string;
  items: string[];
}

const CARD_WIDTH = 280 + 16;

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState<TransformedService[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/services.php`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Transform API data to match component structure
          const transformedData: TransformedService[] = data.map((service: Service) => ({
            title: service.title,
            img: service.image,
            items: service.description.split('|').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
          }));
          
          setServices(transformedData);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Repeat data for infinite loop
  const loopedData = services.length > 0 ? [...services, ...services, ...services] : [];
  const middleIndex = services.length;

  // Scroll Animation Observer
  useEffect(() => {
    if (services.length === 0 || loading) return;

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
  }, [middleIndex, services.length, loading]);

  // On mount, scroll to the middle
  useEffect(() => {
    if (services.length === 0 || loading) return;
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = middleIndex * CARD_WIDTH;
    }
  }, [middleIndex, services.length, loading]);

  // Handle infinite loop illusion
  useEffect(() => {
    if (services.length === 0 || loading) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const totalItems = loopedData.length;
      const maxScrollLeft = (totalItems - 1) * CARD_WIDTH;

      if (scrollLeft <= 0) {
        // At start → jump to middle set
        container.scrollLeft = services.length * CARD_WIDTH;
      } else if (scrollLeft >= maxScrollLeft - CARD_WIDTH) {
        // At end → jump to middle set
        container.scrollLeft = services.length * CARD_WIDTH;
      }

      const index = Math.round(container.scrollLeft / CARD_WIDTH) % services.length;
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [services.length, loopedData.length, loading]);

  const scrollBy = (dir: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: dir === 'left' ? -CARD_WIDTH : CARD_WIDTH, behavior: 'smooth' });
  };

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  if (loading) {
    return (
      <div className={styles.carouselWrapper} id='services'>
        <h3>Our Services</h3>
        <h2>What We Offer</h2>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading services...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return null;
  }

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
        {services.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === activeIndex ? styles.active : ''}`}
            onClick={() => {
              const container = containerRef.current;
              if (!container) return;
              container.scrollTo({
                left: (services.length + idx) * CARD_WIDTH,
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