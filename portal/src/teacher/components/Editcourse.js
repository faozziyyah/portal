import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';

const Editcourse = ({ open, handleClose, course, onCourseUpdated }) => {

    const [title, setTitle] = useState(course.title);
    const [category, setCategory] = useState(course.category.id);
    const [description, setDescription] = useState(course.description);
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (open) {
      axiosInstance.get('/courses-categories/')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          toast.error('Failed to load categories.');
        });
    }
  }, [open]);

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      const response = await axiosInstance.put(`/courses/${course.id}/`, {
        title,
        category: parseInt(category, 10),
        description
      });

      onCourseUpdated(response.data);
      toast.success('Course updated successfully!');
      handleClose();

    } catch (error) {
      toast.error('Failed to update course.');
    }
  };

  return (
    <div className={`modal ${open ? 'is-open' : ''}`}>

      <div className="modal-content">

        <span className="close-button" onClick={handleClose}>&times;</span>

        <h2 className='mt-4 font-bold text-lg text-blue-700'>Edit Course</h2>

        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full mt-6'>

            <label className='text-left font-semibold mb-4 text-blue-700'> Course Title: <br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                    className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
                />
            </label>

            <label className='text-left font-semibold text-blue-700 w-1/2'> Category: </label>

            <select value={category} onChange={(e) => setCategory(e.target.value)} required
                className='border-solid border-2 border-black text-sm rounded-md px-4 py-1 outline-none w-1/2 mb-4 font-semibold'
            >
                <option value="" className='text-blue-700 font-semibold' disabled>Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className='text-blue-700 font-semibold'>{cat.title}</option>
                ))}
            </select>

            <label className='text-left font-semibold mb-4 text-blue-700'> Description: <br />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
                  className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
                />
            </label>

            <button id='modalbtn' type="submit"
                className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black font-semibold'
            >
              Update Course
            </button>
        </form>
      </div>
    </div>
  )
}

export default Editcourse