import React, { useState } from 'react'
import axiosInstance from '../../axiosConfig';

const Modal = ({ open, handleClose, onCourseAdded }) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {

      event.preventDefault();
  
      try {
        const response = await axiosInstance.post('/courses/', {
          title,
          category,
          description
        });
  
        onCourseAdded(response.data);
        handleClose();

      } catch (error) {
        setError('Failed to add course.');
      }
    };
  
  return (
    <div className={`modal ${open ? 'is-open' : ''}`}>
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Course Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button id='modalbtn' type="submit">Add Course</button>
        </form>
      </div>
    </div>

  )
}

export default Modal