import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { firstName, lastName, email, password, confirmPassword, phone } = formData;
  const displayError = error || validationError;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setValidationError('Passwords do not match');
    if (password.length < 6) return setValidationError('Password must be at least 6 characters long');

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      if (result.success) navigate('/');
      else setValidationError(result.message);
    } catch {
      setValidationError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 0', maxWidth: '400px' }}>
      <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Register</h1>
        {displayError && <div className="error" style={{ marginBottom: '1rem' }}>{displayError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleChange} className="form-control" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={email} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input type="tel" id="phone" name="phone" value={phone} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={handleChange} className="form-control" required minLength="6" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>
            Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
