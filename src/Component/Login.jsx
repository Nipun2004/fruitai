import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaPinterest, FaLinkedinIn, FaFingerprint } from 'react-icons/fa';
import './Login.css'; // Create a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate=useNavigate()
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  function handleSubmit(){
    if(email!= '' && pass!= ''){
        navigate('/Home')
    }
  }
  return (
    <div className='main-div'>
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-agreement">
        By signing in you are agreeing to our <a href="#">Term and privacy policy</a>
      </p>
      {/* <div className="login-tabs">
        <button className="login-tab active">Login</button>
        <button className="login-tab">Register</button>
      </div> */}
      

      <form className="login-form">
        <div className="input-group">
          <label htmlFor="email">
            <input type="email" id="email" placeholder="Email Address"  value={email} onChange={(e) => {
                e.preventDefault()
                setEmail(e.target.value)
            }} required />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="password">
            <input type="password" id="password" placeholder="Password" value={pass} onChange={(e) => {
                e.preventDefault()
                setPass(e.target.value)
            }} required />
          </label>
          
        </div>

        <div className="remember-forgot">
          <label className="remember-me">
            <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
            Remember password
          </label>
          <a href="#" className="forgot-password">Forget password</a>
        </div>

        <button type="submit" className="login-button" onClick={handleSubmit}>Login</button>

        <p className="connect-with">or connect with</p>

        <div className="social-icons">
          <FaFacebookF className="icon" />
          <FaInstagram className="icon" />
          <FaPinterest className="icon" />
          <FaLinkedinIn className="icon" />
        </div>

        <div className="fingerprint">
          <FaFingerprint className="fingerprint-icon" />
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
