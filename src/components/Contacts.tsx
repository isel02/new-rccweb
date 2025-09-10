import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import emailjs from 'emailjs-com';
import styles from './Contacts.module.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Handle change of form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback('');

    // Send email to the admin
    emailjs.send(
      'service_6lqsl3n',           // Your EmailJS service ID
      'template_hz5n2il',           // Your email template for the user
      {
        ...formData,               // Send all form data to the template
        to_email: 'rcccabling.netsolutions@yahoo.com.ph',  // Admin email
      },
      'FOte9ExClWFtykYI9'          // Your EmailJS user ID (public key)
    )
    .then(() => {
      // Send email to the user
      return emailjs.send(
        'service_6lqsl3n',           // Your EmailJS service ID
        'template_tkw19ms', // Your email template for the user
        {
          ...formData,               // Send all form data to the template
        },
        'FOte9ExClWFtykYI9'          // Your EmailJS user ID (public key)
      );
    })
    .then(() => {
      setFeedback('Message sent successfully!');
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
      });
    })
    .catch(() => {
      setFeedback('Failed to send message. Please try again.');
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <section className={styles.contactSection} id="contacts">
      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.floatingElement} ${styles.element1}`}></div>
        <div className={`${styles.floatingElement} ${styles.element2}`}></div>
        <div className={`${styles.floatingElement} ${styles.element3}`}></div>
        <div className={`${styles.gridPattern}`}></div>
      </div>

      <div className={styles.container}>
        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <div className={styles.infoHeader}>
            <h3 className={styles.infoTitle}>Contact Us</h3>
            <div className={styles.titleUnderline}></div>
          </div>

          <div className={styles.infoContent}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className={styles.infoText}>
                <strong>Email:</strong>
                <a href="mailto:rcccabling.netsolutions@yahoo.com.ph">
                  rcccabling.netsolutions@yahoo.com.ph
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className={styles.infoText}>
                <strong>Phone:</strong>
                <div className={styles.phoneNumbers}>
                  <a href="tel:+639258738786">(+63) 925 873 8786</a>
                </div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className={styles.infoText}>
                <strong>Facebook:</strong>
                <p><a
                    href="https://www.facebook.com/RCCCABLING"
                    target="_blank"
                    rel="noopener noreferrer"
                  >RCC Cabling and Network Solutions Corp. </a></p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className={styles.infoText}>
                <strong>Office Hours:</strong>
                <p>Monday to Friday | 8:00AM - 6:00PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Let's Get In Touch</h3>
            <p className={styles.formSubtitle}>
              Ready to transform your network infrastructure? We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <div className={styles.inputHighlight}></div>
              </div>
              
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <div className={styles.inputHighlight}></div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number (Optional)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={styles.input}
                />
                <div className={styles.inputHighlight}></div>
              </div>
              
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <div className={styles.inputHighlight}></div>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className={`${styles.input} ${styles.textarea}`}/>
              <div className={styles.inputHighlight}></div>
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className={styles.submitBtn}
            >
              <span className={styles.btnText}>
                {isSending ? 'Sending...' : 'Send Message'}
              </span>
              <div className={styles.btnRipple}></div>
            </button>

            {feedback && (
              <div className={`${styles.feedback} ${feedback.includes('success') ? styles.success : styles.error}`}>
                {feedback}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
