import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import logo from '../assets/images/logo.png';
import signupImg from '../assets/images/signup.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setError('Full name must contain letters only, no numbers or symbols');
      return;
    }
    if (name.trim().length < 3) {
      setError('Full name must be at least 3 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
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
          <span>Already have an account?</span>
          <button onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>

      {/* MAIN SPLIT */}
      <div className="auth-split">

        {/* LEFT — FORM */}
        <div className="auth-form-side">
          <button className="back-btn-corner" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          <div className="auth-form-wrap register">
    <div className="auth-heading">
              <h1>Create Account</h1>
              <p>Join your university library today and explore thousands of books.</p>
            </div>

            

            <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrap">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrap">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
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
                    placeholder="Create a password (min 8 characters)"
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

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrap">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
                    <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                  </span>
                  {confirmPassword && (
                    <span className={`match-icon ${password === confirmPassword ? 'match' : 'no-match'}`}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  )}
                </div>
              </div>

              <div className="auth-btn-wrap">
  {error && <div className="auth-error-inline">{error}</div>}
  <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <><span className="auth-spinner"></span> Creating Account...</>
                ) : (
                  <>Create Account <FontAwesomeIcon icon={faArrowRight} /></>
                )}
  </button>
</div>
            </form>

            <p className="auth-help">Need help? <a href="mailto:info@libraryhub.com">Contact Support</a></p>

            <div className="auth-divider">
              <span>Or sign up with</span>
            </div>

            <div className="auth-social">
              <button className="social-btn">G</button>
              <button className="social-btn">f</button>
              <button className="social-btn">in</button>
            </div>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="auth-image-side">
          <img src={signupImg} alt="Bookstore" />
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <h2>"The more that you read, the more things you will know."</h2>
              <p>— Dr. Seuss</p>
              <div className="auth-image-stats">
                <div className="auth-img-stat">
                  <span>10K+</span>
                  <p>Books</p>
                </div>
                <div className="auth-img-stat">
                  <span>120+</span>
                  <p>Categories</p>
                </div>
                <div className="auth-img-stat">
                  <span>Free</span>
                  <p>Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;