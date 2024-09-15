import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdDelete,MdEdit } from "react-icons/md";
import "./Faq.css"

function FaqList() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState(null); // For editing
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [fruit, setFruit] = useState('');

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/faqs/${id}`)
      .then(() => {
        // Remove the deleted FAQ from the list
        setFaqs(faqs.filter(faq => faq.id !== id));
      })
      .catch(error => console.error("Error deleting FAQ: ", error));
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setFruit(faq.fruit);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    axios.put(`http://127.0.0.1:5000/faqs/${editingFaq.id}`, {
      question: question,
      answer: answer,
      fruit: fruit
    })
      .then(response => {
        // Update the list of FAQs with the updated data
        setFaqs(faqs.map(faq => (faq.id === editingFaq.id ? response.data.faq : faq)));
        setEditingFaq(null);
      })
      .catch(error => console.error("Error updating FAQ: ", error));
  };

  useEffect(() => {
    // Fetch FAQs from Flask API
    axios.get('http://127.0.0.1:5000/faqs')
      .then(response => {
        setFaqs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the FAQs!", error);
        setLoading(false);
      });
  }, []);

  const navigate=useNavigate();
  function createFaq(){
    navigate("/create-faq")
  }
  function handleback(){
    navigate("/home")
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="faq-container">
      <h1 className="faq-title">FAQ List</h1>

      {editingFaq ? (
        <div className="faq-edit">
          <h2>Edit FAQ</h2>
          <form onSubmit={handleUpdate} className="faq-form">
            <div className="form-group">
              <label>Question:</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Answer:</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Fruit:</label>
              <input
                type="text"
                value={fruit}
                onChange={(e) => setFruit(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-update">Update FAQ</button>
            <button onClick={() => setEditingFaq(null)} className="btn btn-cancel">Cancel</button>
          </form>
        </div>
      ) : (
        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <h2 className='fruitname'> {faq.fruit}</h2>
              <h3> {faq.question}</h3>
              <p>{faq.answer}</p>
              
              <div className='edit-deletebtn'>
                <button onClick={() => handleEdit(faq)} className="btn btn-edit">Edit</button>
                <button onClick={() => handleDelete(faq.id)} className="btn btn-delete">Delete</button>
              </div>
              
            </div>
          ))}
          <button onClick={createFaq} className="btn btn-create">Create FAQ</button>
        </div>
      )}
      <button onClick={handleback}>Back to home</button>
    </div>
  );

    
}

export default FaqList;
