import './contact.css';
import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Animate floating elements
    gsap.to('.floating-circle', {
      y: -20,
      rotation: 360,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.floating-square', {
      y: 15,
      rotation: -180,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.floating-triangle', {
      y: -25,
      rotation: 180,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setIsSubmitting(false);

    // Show success animation
    gsap.to('.form-button', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div className="contact-page">
      {/* Floating Background Elements */}
      <div className="floating-element floating-circle"></div>
      <div className="floating-element floating-square"></div>
      <div className="floating-element floating-triangle"></div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate, or
            just want to say hello, feel free to reach out.
          </p>
        </div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="form-title">Send Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your project or just say hi!"
                />
              </div>

              <button type="submit" className="form-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <h2 className="info-title">Contact Info</h2>
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="info-icon email-icon">📧</div>
                <div className="info-label">Email</div>
                <div className="info-value">
                  <a href="mailto:hukochi@example.com" className="info-link">
                    hukochi@example.com
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon phone-icon">📱</div>
                <div className="info-label">Phone</div>
                <div className="info-value">
                  <a href="tel:+1234567890" className="info-link">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>

              {/* <div className="contact-info-card">
                <div className="info-icon location-icon">📍</div>
                <div className="info-label">Location</div>
                <div className="info-value">Germany / UK</div>
              </div> */}

              <div className="contact-info-card">
                <div className="info-icon linkedin-icon">💼</div>
                <div className="info-label">LinkedIn</div>
                <div className="info-value">
                  <a
                    href="https://linkedin.com/in/hukochi"
                    className="info-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /in/hukochi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h3 className="social-title">Follow Me</h3>
          <div className="social-links">
            <a
              href="https://instagram.com/hukochi"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📷
            </a>
            <a
              href="https://artstation.com/hukochi"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎨
            </a>
            <a
              href="https://twitter.com/hukochi"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐦
            </a>
            <a
              href="https://github.com/hukochi"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              💻
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
