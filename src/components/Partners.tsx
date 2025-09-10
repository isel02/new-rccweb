// Partners.jsx
import styles from './Partners.module.css';

const partners = [
  { name: 'Apple', img: '/assets/partners/Apple.png' },
  { name: 'Blackberry', img: '/assets/partners/Blackberry.png' },
  { name: 'Bloomberg', img: '/assets/partners/Bloomberg.png' },
  { name: 'Capital', img: '/assets/partners/Capital.png' },
  { name: 'Cisco', img: '/assets/partners/Cisco.png' },
  { name: 'Citrix', img: '/assets/partners/Citrix.png' },
  { name: 'Dell', img: '/assets/partners/Dell.png' },
  { name: 'EMC', img: '/assets/partners/EMC.png' },
  { name: 'Exchange', img: '/assets/partners/Exchange.png' },
  { name: 'GlobalRelay', img: '/assets/partners/GlobalRelay.png' },
  { name: 'HP', img: '/assets/partners/HP.png' },
  { name: 'IRM', img: '/assets/partners/IRM.png' },
  { name: 'Juniper', img: '/assets/partners/Juniper.png' },
  { name: 'Lenovo', img: '/assets/partners/Lenovo.png' },
  { name: 'Microsoft', img: '/assets/partners/Microsoft.png' },
  { name: 'MicroSoft-Office', img: '/assets/partners/MicroSoft-Office.png' },
  { name: 'Reuters', img: '/assets/partners/Reuters.png' },
  { name: 'Riverbed', img: '/assets/partners/Riverbed.png' },
  { name: 'RSA', img: '/assets/partners/RSA.png' },
  { name: 'Samsung', img: '/assets/partners/Samsung.png' },
  { name: 'Shoretel', img: '/assets/partners/Shoretel.png' },
  { name: 'Symantec', img: '/assets/partners/Symantec.png' },
  { name: 'Veeam', img: '/assets/partners/Veeam.png' },
  { name: 'vmware', img: '/assets/partners/vmware.png' },
];

const PartnerSection = () => {
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
          <div className={styles.logosGrid}>
            {partners.map(({ name, img }, index) => (
              <div 
                key={name} 
                className={styles.logoWrapper}
                style={{ animationDelay: `${index * 0.1}s` }}
                title={name}
              >
                <div className={styles.logoInner}>
                  <img src={img} alt={`${name} logo`} className={styles.logoImg} />
                  <div className={styles.logoGlow}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;