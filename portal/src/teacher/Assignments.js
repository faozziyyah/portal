import React, { useState, useEffect  } from 'react'
import Header from './components/Header';
import Sidemenu from './components/Sidemenu'
import { fetchTeacherAssignments } from '../api';
import axiosInstance from '../axiosConfig'; 
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Addassignment from './components/Addassignment';
import Editassignment from './components/Editassignment';

const TeacherAssignments = ({ token  }) => {

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleEditClick = (assignment) => {
        setSelectedAssignment(assignment);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAssignment(null);
    };

    const handleDelete = async (assignmentId) => {
      if (window.confirm('Are you sure you want to delete this assignment?')) {
        try {
          await axiosInstance.delete(`/assignments/${assignmentId}/`);
          setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
          toast.success('Assignment deleted successfully!');
        } catch (error) {
          toast.error('Failed to delete assignment.');
        }
      }
    };



    useEffect(() => {

      const token = localStorage.getItem('access_token');  // Get token from local storage 

      fetchTeacherAssignments(token)
        .then((data) => {
            setAssignments(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            toast.error('Failed to fetch assignments.');
            setLoading(false);
        });

    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error fetching assignments: {error.message}</div>;
    }

  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <Header />

          <main className='flex flex-col'>

            <div className='flex justify-between items-center mt-4'>

                <h2 className='text-left text-black font-bold mb-4'>Assignments</h2>
                <button onClick={openModal} className='text-purple-700 font-bold'> Add Assignment</button>

                <Addassignment
                  token={token}
                  show={showModal}
                  onClose={closeModal} 
                />

            </div>
            
            {assignments.length === 0 ? (
              <p>No assignments found.</p>
            ) : (
            <div className='mt-6'>
              {assignments.map((assignment) => (

                <Link href='/dashboard/coursedetail' key={assignment.id}
                    className='bg-purple-200 bgpurpl flex justify-around items-center text-center rounded-lg py-2 border-2 border-purple-700 mt-4'
                >
                
                    <p className='font-semibold capitalize'>{assignment.title}</p>
                    <p className=''>{assignment.description}</p>
                    <p className=''>Due Date: {new Date(assignment.due_date).toLocaleString()}</p>

                    <button onClick={() => handleEditClick(assignment)}
                      className='text-white bg-yellow-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1 font-semibold capitalize'
                    > edit
                    </button>

                    <button  onClick={() => handleDelete(assignment.id)}
                      className='text-white bg-red-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1 font-semibold capitalize'
                    > delete
                    </button>
                
                </Link>

              ))}
            </div>
            )}
            
          </main>
            
          {selectedAssignment && (
            <Editassignment
                token={token}
                show={isModalOpen}
                onClose={handleCloseModal}
                assignment={selectedAssignment}
            />
          )}

        </section>
    
    </div>
  )
}

export default TeacherAssignments