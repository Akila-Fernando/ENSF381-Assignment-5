import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  

    const validateForm = () => {
      const usernameFormat = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/; //using regex formats to check
      if (!usernameFormat) {
        setError('Username must be 3-20 characters long, start with a letter, and only contain letters, numbers, hyphens, or underscores.');
        return false;
      }
  
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()\-_+=\[\]{}|;:'",.<>?/`~]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.');
        return false;
      }
  
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return false;
      }

      setError('');
      return true;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        //transfer to backend
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    };
  
  return (
    <div>
    <div
    style={{
      backgroundColor: '	#E0E0E0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }} >
      <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        textAlign: 'center',
        margin: '10% 10% 5% 10%',
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', backgroundColor: '	 #ffffe6'}}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', backgroundColor: '	 #ffffe6' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', backgroundColor: '	 #ffffe6'}}>
            </input>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', backgroundColor: '	 #ffffe6' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
          type="submit" 
          style={{
            width: '40%',
            padding: '10px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            margin: '10px',
            opacity: '0.5',
          }}
          onMouseOver ={(e) => {
            e.target.style.backgroundColor = '#4CA049';
            e.target.style.opacity = '1';
          }}
          onMouseOut ={(e) => {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.opacity = '0.5';
          }}
        >Sign Up
        </button>
        </div>
      </form>
    </div>
    {error && (
        <div style={{ 
          color: '#D32F2F', 
          backgroundColor: '#FFEBEE', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px',
          marginTop: '15px'
        }}>
          {error}
        </div>
    )}
    {success && (
        <div style={{ 
          color: '#478778', 
          backgroundColor: '#ECFFDC', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px',
          marginTop: '15px'
        }}>
          {success}
        </div>
      )}
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
    <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}
    onMouseOver ={(e) => {
      e.target.style.textDecoration = 'underline';
    }}
    onMouseOut ={(e) => {
      e.target.style.textDecoration = 'none';
    }}>
      Already have an account? Login Here
    </Link>
    </div>
    </div>
  );
};

export default RegForm;
