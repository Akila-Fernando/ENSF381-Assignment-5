import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px' 
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '400px', 
          margin: '0 auto' 
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#004080', 
            marginBottom: '30px' 
          }}>
            LMS Student Login
          </h2>
          <LoginForm />
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}
            onMouseOver ={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseOut ={(e) => {
              e.target.style.textDecoration = 'none';
            }}>
              Don't have an account? Sign up now!
          </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
