import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';

const Editassignment = ({ token, show, onClose, assignment }) => {

    const [title, setTitle] = useState(assignment.title);
    const [description, setDescription] = useState(assignment.description);
    const [dueDate, setDueDate] = useState(assignment.due_date);
    const [course, setCourse] = useState(assignment.course.id);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('/courses/created_by_teacher/');
                setCourses(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                toast.error('Failed to load courses.');
            }
        };

        fetchCourses();
    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await axiosInstance.put(`/assignments/${assignment.id}/`,
                { title, description, due_date: dueDate, course: course, },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Assignment updated successfully!')
            setError(null);
            onClose(); // Close the modal

        } catch (err) {
            setError('Error updating assignment');
            toast.error('Error updating assignment.');
            console.error('Error updating assignment:', err);
        }
    };

    if (!show) {
        return null;
    }

  return (
    <div className='modal-backdrop'>

      <div className="modal-content">

        <span className="close-button" onClick={onClose}>&times;</span>

        <h2 className='mt-4 font-bold text-lg text-blue-700'>Edit Assignment</h2>
        
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full mt-6'>

            <label className='text-left font-semibold mb-4 text-blue-700'> Title: <br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                    className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
                />
            </label>

            <label className='text-left font-semibold mb-4 text-blue-700'> Description: <br />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
                className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
              />
            </label>

            <label className='text-left font-semibold mb-4 text-blue-700'> Due Date: <br />
              <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required
                className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
              />
            </label>

          <label className='text-left font-semibold text-blue-700 w-1/2'> Course: </label>

          <select value={course} onChange={(e) => setCourse(e.target.value)} required
            className='border-solid border-2 border-black text-sm rounded-md px-4 py-1 outline-none w-1/2 mb-4 font-semibold'
          >
            <option value="" className='text-blue-700 font-semibold' disabled>Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id} className='text-blue-700 font-semibold'>{course.title}</option>
            ))}
          </select>

            <button id='modalbtn' type="submit"
                className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black font-semibold'
            >
              Update Assignment
            </button>
        </form>
      </div>
    </div>
  )
}

export default Editassignment