// src/components/CreateFaq.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function CreateFaq() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [fruit, setFruit] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request to Flask API
    axios
      .post('http://127.0.0.1:5000/faqs', {
        question: question,
        answer: answer,
        fruit: fruit,
      })
      .then((response) => {
        // Handle success
        setMessage('FAQ created successfully!');
        setQuestion('');
        setAnswer('');
        setFruit('');
      })
      .catch((error) => {
        // Handle error
        setMessage('Failed to create FAQ. Please try again.');
        console.error('There was an error creating the FAQ!', error);
      });
      navigate("/Faq")
  };

  return (
    <div>
      <h2>Create a New FAQ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fruit:</label>
          <input
            type="text"
            value={fruit}
            onChange={(e) => setFruit(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create FAQ</button>
      </form>
      

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateFaq;
