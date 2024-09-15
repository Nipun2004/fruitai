import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';


const About = () => {
    const navigate=useNavigate();
    function handleClick(){
        navigate('/Home')
    }
  return (
    <div className="fruit-ai-card">
      <div className="fruit-ai-content">
        <div className="fruit-ai-logo">
          {/* Replace this with an actual image or SVG */}
          <h1>F</h1><h1>F</h1><h1>F</h1>
        </div>
        <div className="fruit-ai-description">
          <h2>Fruit.Ai</h2>
          <p>
            Whether you're looking to discover new fruits, understand their nutritional values, 
            or find the perfect fruit for your diet, our AI-driven chatbot is here to assist.
            We provide personalized fruit recommendations tailored to your health needs, 
            making it easier for you to integrate the best fruits into your daily routine.
          </p>
          <button className="back-button" onClick={handleClick}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default About;
