import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import logo from '../assets/images/logo.png';
import heroImg from '../assets/images/hero.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">

      {/* TOP NAV */}
      <div className="auth-topbar">
        <div className="auth-logo" onClick={() => navigate('/')}>
  <img src={logo} alt="LibraryHub" />
  <span>LibraryHub</span>
</div>

        <div className="auth-topbar-right">
          <span>Don't have an account?</span>
          <button onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </div>

      {/* MAIN SPLIT */}
      <div className="auth-split">

        {/* LEFT — FORM */}
        <div className="auth-form-side">
          <button className="back-btn-corner" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          <div className="auth-form-wrap">
    <div className="auth-heading">
              <h1>Log in</h1>
              <p>Welcome back! Sign in to your library account.</p>
            </div>

       

            <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
              <div className="form-group">
                <label>Username or Email</label>
                <div className="input-wrap">
  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
  <input
    type="text"
    placeholder="Enter your username or email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    autoComplete="off"
  />
</div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrap">
  <FontAwesomeIcon icon={faLock} className="input-icon" />
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  autoComplete="new-password"
/>
                  <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>

             <div className="auth-btn-wrap">
  {error && <div className="auth-error-inline">{error}</div>}
  <button type="submit" className="auth-submit-btn" disabled={loading}>
    {loading ? (
      <><span className="auth-spinner"></span> Signing in...</>
    ) : (
      <>Log In <FontAwesomeIcon icon={faArrowRight} /></>
    )}
  </button>
</div>
            </form>

            <div className="auth-extras">
  <label className="remember-me">
    <input type="checkbox" /> Remember me
  </label>
  <p className="auth-forgot">Forgot Password?</p>
</div>
<p className="auth-help">Need help? <a href="mailto:info@libraryhub.com">Contact Support</a></p>

            <div className="auth-divider">
              <span>Log in with</span>
            </div>

            <div className="auth-social">
              <button className="social-btn">G</button>
              <button className="social-btn">f</button>
              <button className="social-btn">in</button>
            </div>

            <p className="auth-switch">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="auth-image-side">
          <img src={heroImg} alt="Library" />
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <h2>"A reader lives a thousand lives before he dies."</h2>
              <p>— George R.R. Martin</p>
              <div className="auth-image-stats">
                <div className="auth-img-stat">
                  <span>10K+</span>
                  <p>Books</p>
                </div>
                <div className="auth-img-stat">
                  <span>5K+</span>
                  <p>Students</p>
                </div>
                <div className="auth-img-stat">
                  <span>120+</span>
                  <p>Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;