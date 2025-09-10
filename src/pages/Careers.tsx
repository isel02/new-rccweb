import React, { useEffect, useRef, useState, } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Careers.module.css';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  availability: string;
  coverLetter: string;
  resume: File | null;
}

const Careers: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const whyJoinRef = useRef<HTMLElement>(null);
  const positionsRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const cultureRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    coverLetter: '',
    resume: null
  });

  // Function to scroll to positions section
  const scrollToPositions = () => {
    if (positionsRef.current) {
      positionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, 
    section: string
  ) => {
    e.preventDefault();
    
    // Always navigate to home with hash
    navigate(`/#${section}`);
    
    // If already on home page, scroll immediately
    if (location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const jobPositions: JobPosition[] = [
  ];

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

    const elements = [heroRef.current, whyJoinRef.current, positionsRef.current, benefitsRef.current, cultureRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openJobModal = (job: JobPosition) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeJobModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const openApplicationForm = (job: JobPosition) => {
    setSelectedJob(job);
    setShowModal(false);
    setShowApplicationForm(true);
    setSubmitStatus('idle');
    // Reset form data
    setApplicationData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      availability: '',
      coverLetter: '',
      resume: null
    });
  };

  const closeApplicationForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    setSubmitStatus('idle');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send the data to your backend
      console.log('Application submitted:', {
        job: selectedJob,
        applicationData
      });
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <img src="/assets/RCC-Logo2.png" alt="RCC Logo" className={styles.logo} />
          </div>
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
            <Link to="/careers">Careers</Link>
            <button className={styles.contactBtn} onClick={(e) => handleNavClick(e, 'contact')}>Contact Us</button>
          </nav>
        </div>
      </header>

      <main className={styles.container}>
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Build Your Future<br />
              With Innovation.
            </h1>
            <p className={styles.heroSubtitle}>
              Join our team of passionate professionals shaping the future of network technology and system integration.
            </p>
            <button className={styles.heroBtn} onClick={scrollToPositions}>
              View Open Positions
            </button>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section ref={whyJoinRef} className={styles.whyJoinSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>WHY JOIN RCC</h2>
            <h3 className={styles.sectionHeading}>Empowering Careers in Technology</h3>
            
            <div className={styles.reasonsGrid}>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🚀</div>
                <h4 className={styles.reasonTitle}>Innovation First</h4>
                <p className={styles.reasonText}>
                  Work with cutting-edge technologies and be part of groundbreaking projects that shape the future of network infrastructure.
                </p>
              </div>
              
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>📈</div>
                <h4 className={styles.reasonTitle}>Career Growth</h4>
                <p className={styles.reasonText}>
                  Continuous learning opportunities, professional development programs, and clear career advancement paths.
                </p>
              </div>
              
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🤝</div>
                <h4 className={styles.reasonTitle}>Team Excellence</h4>
                <p className={styles.reasonText}>
                  Collaborate with industry experts and passionate professionals who are committed to delivering exceptional results.
                </p>
              </div>
              
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🎯</div>
                <h4 className={styles.reasonTitle}>Meaningful Work</h4>
                <p className={styles.reasonText}>
                  Contribute to projects that connect businesses, enhance security, and build the infrastructure of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section ref={positionsRef} className={styles.positionsSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>OPEN POSITIONS</h2>
            <h3 className={styles.sectionHeading}>Current Opportunities</h3>
            
            <div className={styles.jobsGrid}>
              {jobPositions.map((job) => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.jobHeader}>
                    <h4 className={styles.jobTitle}>{job.title}</h4>
                    <span className={styles.jobType}>{job.type}</span>
                  </div>
                  
                  <div className={styles.jobMeta}>
                    <span className={styles.jobDepartment}>{job.department}</span>
                    <span className={styles.jobLocation}>{job.location}</span>
                    <span className={styles.jobExperience}>{job.experience}</span>
                  </div>
                  
                  <p className={styles.jobDescription}>
                    {job.description.substring(0, 120)}...
                  </p>
                  
                  <button 
                    className={styles.viewJobBtn}
                    onClick={() => openJobModal(job)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} className={styles.benefitsSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>EMPLOYEE BENEFITS</h2>
            <h3 className={styles.sectionHeading}>Comprehensive Benefits Package</h3>
            
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💰</div>
                <h4 className={styles.benefitTitle}>Competitive Compensation</h4>
                <p className={styles.benefitText}>Market-competitive salaries with performance-based bonuses and annual reviews.</p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🏥</div>
                <h4 className={styles.benefitTitle}>Health & Wellness</h4>
                <p className={styles.benefitText}>Comprehensive health insurance coverage including medical, dental, and vision care.</p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📚</div>
                <h4 className={styles.benefitTitle}>Professional Development</h4>
                <p className={styles.benefitText}>Training programs, certification support, and conference attendance opportunities.</p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⚖️</div>
                <h4 className={styles.benefitTitle}>Work-Life Balance</h4>
                <p className={styles.benefitText}>Flexible working arrangements, paid time off, and family-friendly policies.</p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🚗</div>
                <h4 className={styles.benefitTitle}>Transportation</h4>
                <p className={styles.benefitText}>Company vehicles for field positions and transportation allowances.</p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🎉</div>
                <h4 className={styles.benefitTitle}>Team Events</h4>
                <p className={styles.benefitText}>Regular team building activities, company events, and celebration of achievements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section ref={cultureRef} className={styles.cultureSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.cultureContent}>
              <div className={styles.cultureText}>
                <h2 className={styles.sectionTitle}>OUR CULTURE</h2>
                <h3 className={styles.cultureHeading}>Innovation Through Collaboration</h3>
                <p className={styles.cultureDescription}>
                  At RCC, we foster a culture of innovation, collaboration, and continuous learning. Our team is our greatest asset, and we're committed to creating an environment where everyone can thrive and contribute to our shared success.
                </p>
                <p className={styles.cultureDescription}>
                  We believe in empowering our employees to take ownership of their work, pursue their passions, and grow both personally and professionally. Join us in building the future of network technology.
                </p>
                <div className={styles.cultureStats}>
                  <div className={styles.cultureStat}>
                    <span className={styles.cultureStatNumber}>95%</span>
                    <span className={styles.cultureStatLabel}>Employee Satisfaction</span>
                  </div>
                  <div className={styles.cultureStat}>
                    <span className={styles.cultureStatNumber}>4.8/5</span>
                    <span className={styles.cultureStatLabel}>Workplace Rating</span>
                  </div>
                  <div className={styles.cultureStat}>
                    <span className={styles.cultureStatNumber}>90%</span>
                    <span className={styles.cultureStatLabel}>Employee Retention</span>
                  </div>
                </div>
              </div>
              <div className={styles.cultureImage}>
                <img src="/assets/company.jpg" alt="Team Culture" className={styles.teamImage} />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
            <p className={styles.ctaText}>
              Take the next step in your career and join our innovative team today.
            </p>
            <button className={styles.ctaBtn} onClick={scrollToPositions}>Apply Now</button>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>&copy; 2025 RCC CABLING AND NETWORK SOLUTIONS CORPORATION. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className={styles.modalOverlay} onClick={closeJobModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeJobModal}>×</button>
            
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{selectedJob.title}</h3>
              <div className={styles.modalMeta}>
                <span className={styles.modalDepartment}>{selectedJob.department}</span>
                <span className={styles.modalLocation}>{selectedJob.location}</span>
                <span className={styles.modalType}>{selectedJob.type}</span>
                <span className={styles.modalExperience}>{selectedJob.experience}</span>
              </div>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Job Description</h4>
                <p className={styles.modalDescription}>{selectedJob.description}</p>
              </div>
              
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Requirements</h4>
                <ul className={styles.modalList}>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className={styles.modalListItem}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Benefits</h4>
                <ul className={styles.modalList}>
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className={styles.modalListItem}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button 
                className={styles.applyBtn}
                onClick={() => openApplicationForm(selectedJob)}
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className={styles.modalOverlay} onClick={closeApplicationForm}>
          <div className={styles.applicationModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeApplicationForm}>×</button>
            
            <div className={styles.applicationHeader}>
              <h3 className={styles.applicationTitle}>Apply for {selectedJob.title}</h3>
              <p className={styles.applicationSubtitle}>
                {selectedJob.department} • {selectedJob.location}
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Application Submitted Successfully!</h3>
                <p className={styles.successText}>
                  Thank you for your interest in the {selectedJob.title} position. 
                  We'll review your application and get back to you within 5-7 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className={styles.applicationForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={applicationData.firstName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={applicationData.lastName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Resume/CV *</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <p className={styles.fileHelp}>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Years of Experience *</label>
                    <select
                      name="experience"
                      value={applicationData.experience}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years (Entry Level)</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-8">6-8 years</option>
                      <option value="9-12">9-12 years</option>
                      <option value="12+">12+ years (Senior Level)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Availability *</label>
                    <select
                      name="availability"
                      value={applicationData.availability}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="immediate">Immediate</option>
                      <option value="2-weeks">2 weeks notice</option>
                      <option value="1-month">1 month notice</option>
                      <option value="2-months">2 months notice</option>
                      <option value="3-months">3+ months</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    rows={4}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <span className={styles.errorIcon}>⚠</span>
                    There was an error submitting your application. Please try again.
                  </div>
                )}

                <div className={styles.applicationFooter}>
                  <button
                    type="button"
                    onClick={closeApplicationForm}
                    className={styles.cancelBtn}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.loadingSpinner}>
                        <span className={styles.spinner}></span>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Careers;