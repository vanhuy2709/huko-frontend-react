import './about.css';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TAboutPageProps = {} & React.HTMLAttributes<HTMLDivElement>;

const AboutPage: React.FC<TAboutPageProps> = () => {
  useEffect(() => {
    // Animation for hero section
    gsap.fromTo(
      '.about-hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.about-hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
    );

    // Animation for sections on scroll
    gsap.fromTo(
      '.about-section',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Skills animation
    gsap.fromTo(
      '.skill-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Three.js', level: 80 },
    { name: 'WebGL', level: 75 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Blender', level: 70 }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Me</h1>
          <p className="about-hero-subtitle">
            Passionate developer creating immersive digital experiences
          </p>
        </div>
        <div className="about-hero-visual">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-content">
        {/* Introduction Section */}
        <section className="about-section intro-section">
          <div className="section-content">
            <h2 className="section-title">Hello, I'm HukoChi</h2>
            <div className="intro-text">
              <p>
                I'm a creative developer with a passion for building immersive 3D web experiences.
                With expertise in modern web technologies and 3D graphics, I bring ideas to life
                through interactive digital experiences.
              </p>
              <p>
                My journey in development started with curiosity about how things work, and has
                evolved into a deep appreciation for the intersection of technology and creativity.
                I love solving complex problems and creating solutions that are both functional and
                beautiful.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="about-section experience-section">
          <div className="section-content">
            <h2 className="section-title">Experience</h2>
            <div className="experience-timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Senior Frontend Developer</h3>
                  <span className="timeline-date">2022 - Present</span>
                  <p>
                    Leading frontend development projects, specializing in React and 3D web
                    experiences.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Full Stack Developer</h3>
                  <span className="timeline-date">2020 - 2022</span>
                  <p>
                    Developed full-stack applications using modern web technologies and frameworks.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Junior Developer</h3>
                  <span className="timeline-date">2019 - 2020</span>
                  <p>
                    Started my development journey, learning fundamentals and building first
                    projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="about-section skills-section">
          <div className="section-content">
            <h2 className="section-title">Skills & Technologies</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="about-section philosophy-section">
          <div className="section-content">
            <h2 className="section-title">My Philosophy</h2>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <div className="philosophy-icon">🎨</div>
                <h3>Design Thinking</h3>
                <p>
                  Every line of code should serve a purpose, creating meaningful and intuitive user
                  experiences.
                </p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">🚀</div>
                <h3>Innovation</h3>
                <p>
                  Constantly exploring new technologies and pushing the boundaries of what's
                  possible on the web.
                </p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">🤝</div>
                <h3>Collaboration</h3>
                <p>
                  Great projects are built by great teams. I believe in open communication and
                  shared learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="about-section fun-facts-section">
          <div className="section-content">
            <h2 className="section-title">Fun Facts</h2>
            <div className="facts-grid">
              <div className="fact-item">
                <div className="fact-number">500+</div>
                <div className="fact-label">Commits this year</div>
              </div>
              <div className="fact-item">
                <div className="fact-number">15+</div>
                <div className="fact-label">Projects completed</div>
              </div>
              <div className="fact-item">
                <div className="fact-number">∞</div>
                <div className="fact-label">Cups of coffee</div>
              </div>
              <div className="fact-item">
                <div className="fact-number">24/7</div>
                <div className="fact-label">Learning mode</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
