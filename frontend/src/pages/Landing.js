import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faBook, faUsers, faChartBar, faBell, faLock,
  faBookOpen, faBullseye, faIdCard, faChartLine, faFolder,
  faDatabase, faBolt, faPalette, faShield, faMobile,
  faCheckCircle, faStar, faArrowRight, faBars, faTimes,
  faPhone, faEnvelope, faClock, faMapMarkerAlt, faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import './Landing.css';
import logo from '../assets/images/logo.png';
import heroImg from '../assets/images/hero.jpg';
import aboutImg from '../assets/images/about.jpg';
import librarianImg from '../assets/images/librarian.jpg';
import booksImg from '../assets/images/books.jpg';
import cozyImg from '../assets/images/cozy.jpg';
import student1 from '../assets/images/student1.jpg';
import student2 from '../assets/images/student2.jpg';
import student3 from '../assets/images/student3.jpg';
import student4 from '../assets/images/student4.jpg';
import team1 from '../assets/images/team1.jpg';
import team2 from '../assets/images/team2.jpg';
import team3 from '../assets/images/team3.jpg';
import team4 from '../assets/images/team4.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [counts, setCounts] = useState({ books: 0, students: 0, librarians: 0, categories: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targets = { books: 10000, students: 5000, librarians: 50, categories: 120 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        books: Math.floor(targets.books * progress),
        students: Math.floor(targets.students * progress),
        librarians: Math.floor(targets.librarians * progress),
        categories: Math.floor(targets.categories * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    { q: 'How do I register to use the library system?', a: 'Simply click the Get Started button, fill in your details and you will have instant access to the full library system.' },
    { q: 'Can I search for books by author or category?', a: 'Yes! Our powerful search system lets you find books by title, author, ISBN, category or publication date.' },
    { q: 'How do I add a new book to the system?', a: 'After logging in, go to your dashboard and click Add New Book. Fill in the details and the book is instantly added to the database.' },
    { q: 'Is my data secure in this system?', a: 'Absolutely. We use JWT authentication, encrypted passwords and secure MongoDB database to keep all your data safe.' },
    { q: 'Can multiple users use the system at the same time?', a: 'Yes! LibraryHub is built for multiple concurrent users. Every user has their own secure account and dashboard.' },
  ];

  const features = [
    { icon: faSearch, title: 'Smart Search', desc: 'Search books instantly by title, author, ISBN or category with real time results.' },
    { icon: faBook, title: 'Book Management', desc: 'Add, edit, update and delete books from your collection with ease.' },
    { icon: faUsers, title: 'User Management', desc: 'Manage library members, roles and access permissions securely.' },
    { icon: faChartBar, title: 'Reports & Analytics', desc: 'Get detailed reports on book availability, usage and library statistics.' },
    { icon: faBell, title: 'Notifications', desc: 'Get instant alerts for book availability, due dates and library updates.' },
    { icon: faLock, title: 'Secure Access', desc: 'JWT authentication and encrypted data keeps your library system safe.' },
  ];

  const services = [
    { icon: faBookOpen, title: 'Book Cataloging', desc: 'Organize and catalog thousands of books with detailed metadata and categories.' },
    { icon: faBullseye, title: 'Book Tracking', desc: 'Track book availability, location and borrowing status in real time.' },
    { icon: faIdCard, title: 'Member Management', desc: 'Manage library members, issue cards and track borrowing history.' },
    { icon: faChartLine, title: 'Usage Analytics', desc: 'Detailed analytics on most borrowed books, active members and trends.' },
    { icon: faFolder, title: 'Category System', desc: 'Organize books into categories and subcategories for easy browsing.' },
    { icon: faDatabase, title: 'Data Backup', desc: 'Automatic database backup ensures your library data is always safe.' },
  ];

  const whyUs = [
    { icon: faBolt, title: 'Lightning Fast', desc: 'Built with modern technology for instant response and smooth performance.' },
    { icon: faPalette, title: 'Beautiful Design', desc: 'Clean, modern interface that follows all HCI principles for best user experience.' },
    { icon: faShield, title: 'Highly Secure', desc: 'Enterprise level security with JWT tokens and encrypted passwords.' },
    { icon: faMobile, title: 'Fully Responsive', desc: 'Works perfectly on desktop, tablet and mobile devices.' },
  ];

  const timeline = [
    { year: '2010', title: 'Founded', desc: 'LibraryHub was founded with a vision to make library management accessible and modern.' },
    { year: '2015', title: 'Expanded', desc: 'Grew our system to serve over 100 universities across the country.' },
    { year: '2020', title: 'New Technology', desc: 'Introduced advanced digital tools and cloud-based management features.' },
    { year: '2026', title: 'Growing Strong', desc: 'Continuing to grow and serve thousands of students and librarians every day.' },
  ];

  const team = [
    { img: team1, name: 'Dr. Sarah Ahmed', role: 'Head Librarian' },
    { img: team2, name: 'Prof. Ali Hassan', role: 'Senior Librarian' },
    { img: team3, name: 'Ms. Fatima Khan', role: 'Digital Resources' },
    { img: team4, name: 'Mr. Usman Malik', role: 'IT Librarian' },
  ];

  const testimonials = [
    { img: student1, name: 'Muhammad Habib', role: 'CS Student', stars: 5, text: 'LibraryHub completely transformed how I find and manage books. The search system is incredibly fast and the interface is beautiful.' },
    { img: student2, name: 'Ayesha Siddiqui', role: 'Business Student', stars: 5, text: 'I love how easy it is to browse books by category. The dashboard is clean and I can find everything I need in seconds.' },
    { img: student3, name: 'Hassan Raza', role: 'Engineering Student', stars: 5, text: 'The best library management system I have used. Professional, fast and very easy to use. Highly recommended!' },
    { img: student4, name: 'Zara Malik', role: 'Medical Student', stars: 5, text: 'LibraryHub saves me so much time. I can check book availability before going to the library. Amazing system!' },
  ];

  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="LibraryHub" />
            <span>LibraryHub</span>
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-buttons">
            <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
            <button className="btn-register" onClick={() => navigate('/register')}>Get Started</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-img-stack">
            <div className="hero-img-main">
              <img src={heroImg} alt="Library" />
            </div>
            <div className="hero-img-secondary">
              <img src={cozyImg} alt="Cozy Library" />
            </div>
          </div>
        </div>
        <div className="hero-right">
          <span className="hero-badge">🏛️ University Library Management System</span>
          <h1 className="hero-title">LIBRARY</h1>
          <h2 className="hero-subtitle-text">Manage Smarter. <span className="brown-text">Read Better.</span></h2>
          <p className="hero-desc">A modern, powerful and beautiful library management system designed for universities. Search, manage and organize thousands of books with ease.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              Get Started <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <img src={student1} alt="user" />
              <img src={student2} alt="user" />
              <img src={student3} alt="user" />
              <img src={student4} alt="user" />
            </div>
            <span>Trusted by <strong>5,000+</strong> students</span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="trust-container">
          <div className="trust-item">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>Trusted by 5000+ Students</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faStar} />
            <span>5 Star Rated System</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faLock} />
            <span>100% Secure & Encrypted</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faBook} />
            <span>10,000+ Books Managed</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="section-container">
          <div className="section-label">OUR NUMBERS</div>
          <h2 className="section-title">Numbers That <span className="brown-text">Speak</span></h2>
          <p className="section-subtitle">Our library system manages thousands of books and serves thousands of students every day.</p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrap"><FontAwesomeIcon icon={faBook} /></div>
              <span className="stat-number">{counts.books.toLocaleString()}+</span>
              <span className="stat-label">Total Books</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap"><FontAwesomeIcon icon={faUsers} /></div>
              <span className="stat-number">{counts.students.toLocaleString()}+</span>
              <span className="stat-label">Happy Students</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap"><FontAwesomeIcon icon={faIdCard} /></div>
              <span className="stat-number">{counts.librarians}+</span>
              <span className="stat-label">Expert Librarians</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap"><FontAwesomeIcon icon={faFolder} /></div>
              <span className="stat-number">{counts.categories}+</span>
              <span className="stat-label">Book Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-label">WHAT WE OFFER</div>
          <h2 className="section-title">Powerful <span className="brown-text">Features</span></h2>
          <p className="section-subtitle">Everything you need to manage a modern university library efficiently and professionally.</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon-wrap">
                  <FontAwesomeIcon icon={f.icon} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="learn-more">Learn More <FontAwesomeIcon icon={faArrowRight} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-container">
          <div className="section-label">SIMPLE PROCESS</div>
          <h2 className="section-title">How It <span className="brown-text">Works</span></h2>
          <p className="section-subtitle">Get started with LibraryHub in just 3 simple steps.</p>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-icon-wrap"><FontAwesomeIcon icon={faIdCard} /></div>
              <h3>Create Account</h3>
              <p>Register with your university email and set up your library profile in minutes.</p>
            </div>
            <div className="step-line"><span>▶</span></div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-icon-wrap"><FontAwesomeIcon icon={faSearch} /></div>
              <h3>Browse Library</h3>
              <p>Search and explore thousands of books by title, author, category or ISBN.</p>
            </div>
            <div className="step-line"><span>▶</span></div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-icon-wrap"><FontAwesomeIcon icon={faBook} /></div>
              <h3>Manage Books</h3>
              <p>Add, edit, track and manage your entire book collection from one dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <div className="section-container">
          <div className="section-label">WHY LIBRARYHUB</div>
          <h2 className="section-title">Why Choose <span className="brown-text">Us</span></h2>
          <p className="section-subtitle">We built LibraryHub with one goal — to make library management simple, fast and beautiful.</p>
          <div className="why-grid">
            {whyUs.map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon-wrap"><FontAwesomeIcon icon={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-image-wrap">
              <div className="about-img-main">
                <img src={aboutImg} alt="About" />
              </div>
              <div className="about-img-clip">
                <img src={librarianImg} alt="Librarian" />
              </div>
              <div className="about-badge">
                <span className="badge-number">15+</span>
                <span className="badge-text">Years of Excellence</span>
              </div>
            </div>
            <div className="about-content">
              <div className="section-label">WELCOME TO LIBRARYHUB</div>
              <h2 className="section-title">Knowledge Is <span className="brown-text">Power</span></h2>
              <p>At LibraryHub, we believe that every student deserves easy access to knowledge. Since our founding, we have been providing modern, efficient and beautiful library management solutions to universities across the country.</p>
              <p>Our mission is simple — to make library management effortless so librarians can focus on what matters most: helping students learn and grow.</p>
              <div className="about-mini-cards">
                <div className="mini-card">
                  <FontAwesomeIcon icon={faUsers} />
                  <div>
                    <h4>Expert Team</h4>
                    <p>Experienced librarians dedicated to serving you.</p>
                  </div>
                </div>
                <div className="mini-card">
                  <FontAwesomeIcon icon={faBolt} />
                  <div>
                    <h4>Advanced Technology</h4>
                    <p>Modern tools for precise and comfortable management.</p>
                  </div>
                </div>
                <div className="mini-card">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <div>
                    <h4>Student First</h4>
                    <p>Your comfort and satisfaction are our top priorities.</p>
                  </div>
                </div>
              </div>
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Meet Our Team <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT STATS */}
      <section className="about-stats-section">
        <div className="section-container">
          <div className="about-stats-grid">
            <div className="about-stat">
              <span>10K+</span>
              <p>Books Available</p>
            </div>
            <div className="about-stat">
              <span>5K+</span>
              <p>Active Students</p>
            </div>
            <div className="about-stat">
              <span>98%</span>
              <p>Satisfaction Rate</p>
            </div>
            <div className="about-stat">
              <span>50+</span>
              <p>Expert Librarians</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-container">
          <div className="section-label">COMPLETE SOLUTIONS</div>
          <h2 className="section-title">Our <span className="brown-text">Services</span></h2>
          <p className="section-subtitle">A complete suite of library management services designed for modern universities.</p>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon-wrap"><FontAwesomeIcon icon={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="learn-more">Learn More <FontAwesomeIcon icon={faArrowRight} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="banner-section">
        <div className="banner-image">
          <img src={booksImg} alt="Books" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2>Professional Library Management <span>Made Simple</span></h2>
              <p>Join thousands of universities already using LibraryHub to manage their collections efficiently.</p>
              <button className="btn-white" onClick={() => navigate('/register')}>
                Get Started Today <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="section-container">
          <div className="section-label">OUR JOURNEY</div>
          <h2 className="section-title">Our <span className="brown-text">Story</span></h2>
          <p className="section-subtitle">How LibraryHub grew from a simple idea to a university-wide solution.</p>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-icon"><FontAwesomeIcon icon={faBook} /></div>
                <div className="timeline-year">{t.year}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section" id="team">
        <div className="section-container">
          <div className="section-label">MEET THE EXPERTS</div>
          <h2 className="section-title">Our Expert <span className="brown-text">Team</span></h2>
          <p className="section-subtitle">Our dedicated team of librarians and technology experts work together to serve you better.</p>
          <div className="team-grid">
            {team.map((t, i) => (
              <div className="team-card" key={i}>
                <div className="team-img">
                  <img src={t.img} alt={t.name} />
                </div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
                <div className="team-social">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <FontAwesomeIcon icon={faPhone} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-label">WHAT STUDENTS SAY</div>
          <h2 className="section-title">Student <span className="brown-text">Reviews</span></h2>
          <p className="section-subtitle">Hear what our students and librarians say about LibraryHub.</p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <div className="stars">
                  {[...Array(t.stars)].map((_, s) => (
                    <FontAwesomeIcon icon={faStar} key={s} />
                  ))}
                </div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS BANNER */}
      <section className="books-banner">
        <div className="books-banner-image">
          <img src={cozyImg} alt="Books" />
          <div className="books-banner-overlay">
            <div className="books-stats">
              <div className="books-stat">
                <span>10,000+</span>
                <p>Books in Collection</p>
              </div>
              <div className="books-stat">
                <span>120+</span>
                <p>Categories</p>
              </div>
              <div className="books-stat">
                <span>500+</span>
                <p>New Books Monthly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-container">
          <div className="section-label">COMMON QUESTIONS</div>
          <h2 className="section-title">Frequently Asked <span className="brown-text">Questions</span></h2>
          <p className="section-subtitle">Everything you need to know about LibraryHub.</p>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item ${activeAccordion === i ? 'active' : ''}`} key={i}>
                <div className="faq-question" onClick={() => toggleAccordion(i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{activeAccordion === i ? '−' : '+'}</span>
                </div>
                {activeAccordion === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-box">
            <div className="section-label">GET STARTED TODAY</div>
            <h2>Ready to Transform Your <span className="brown-text">Library?</span></h2>
            <p>Join thousands of universities already using LibraryHub. Set up your library system in minutes.</p>
            <div className="cta-btns">
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Start For Free <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button className="btn-secondary" onClick={() => navigate('/login')}>Sign In</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="LibraryHub" />
              <span>LibraryHub</span>
            </div>
            <p>A modern university library management system built with love for students and librarians.</p>
            <div className="footer-social">
              <span><FontAwesomeIcon icon={faEnvelope} /></span>
              <span><FontAwesomeIcon icon={faPhone} /></span>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Book Management</a></li>
              <li><a href="#services">User Management</a></li>
              <li><a href="#services">Reports</a></li>
              <li><a href="#services">Search System</a></li>
              <li><a href="#services">Categories</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> University Campus, Main Library</p>
            <p><FontAwesomeIcon icon={faPhone} /> (555) 123-4567</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@libraryhub.com</p>
            <p><FontAwesomeIcon icon={faClock} /> Mon - Fri: 8AM - 8PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 LibraryHub. All rights reserved. Built with ❤️ for universities.</p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;