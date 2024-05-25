import React, { useState, useEffect  } from 'react'
import Header from '../components/Header';
import Sidemenu from '../components/Sidemenu'
import { fetchAssignments, submitAssignment } from '../api'; 
import {Link} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "rgb(233, 213, 255 )",
  //bgcolor: 'background.paper',
  border: '2px solid rgb(126, 34, 206 )',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}; 

const Assignments = ({ assignmentId }) => {

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');  // Get token from local storage
        if (token) {
            fetchUserAssignments(token);
        } else {
            setLoading(false);
            setError('Access token not found.');
        }
    }, []);

    const fetchUserAssignments = async (token) => {
        try {
            const data = await fetchAssignments(token);
            setAssignments(data);
            const assignmentIds = data.map(assignment => assignment.id);
            localStorage.setItem('user-id', assignmentIds)
            //console.log(assignmentIds)
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch assignments.');
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');  // Get token from local storage

        if (!token) {
          setError('Access token not found.');
            return;
        }

        const formData = new FormData();
        const id = localStorage.getItem('user-id')
        //console.log(id)
        //formData.append('assignment', assignmentId);
        formData.append('assignment', id);
        formData.append('file', file);

        try {
            await submitAssignment(formData, token);
            setFile(null);  // Clear the form
        } catch (error) {
          setError('Failed to submit assignment.');
        }
    };

  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <Header />

          <main className='flex flex-col'>

            <div className='flex flex-col mt-4'>

                <h2 className='text-left text-black font-bold mb-4'>Assignments</h2>

                {loading && 
                    <div className="loading-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                }
                {error && <p>Error: {error}</p>}

            </div>

            {assignments.map((assignment) => (

                <Link href='/dashboard/coursedetail' key={assignment.id}
                    className='bg-purple-200 bgpurpl flex justify-around items-center text-center rounded-lg py-2 border-2 border-purple-700'
                >
                
                    <p className='font-semibold capitalize'>{assignment.title}</p>
                    <p className=''>{assignment.description}</p>
                    <p className=''>Due Date: {assignment.due_date}</p>
                    <p className=''>Status</p>
                    <p className='font-semibold' onClick={handleOpen}>Submit</p>

                    
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open} onClose={handleClose} closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{ backdrop: { timeout: 500, }, }}
                    >
                        <Fade in={open}>
                          <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" className='font-bold capitalize'>
                                {assignment.title}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>{assignment.description}</Typography>
                              
                              <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="content">Submission:</label> <br />
                                    <input id="file" type="file" onChange={handleFileChange} required />
                                </div>
                                <button className='text-white bg-purple-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1' type="submit">Submit</button>
                              </form>
                          </Box>
                        </Fade>
                    </Modal>
                
                </Link>

            ))}
            
                              
            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="content">Submission:</label> <br />
                                    <input id="file" type="file" onChange={handleFileChange} required />
                                </div>
                                <button className='text-white bg-purple-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1' type="submit">Submit</button>
                              </form>
            
          </main>

        </section>
    
    </div>
  )
}

export default Assignments