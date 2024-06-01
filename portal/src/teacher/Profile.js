import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; 
import { toast } from 'react-toastify';
import Sidemenu from './components/Sidemenu';
import Editprofile from '../students/components/Editprofile';

const TeacherProfile = ({ token }) => {
    
    const [profile, setProfile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {

      const fetchProfile = async (profileId) => {

        try {
          const response = await axiosInstance.get(`/profiles/${profileId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.setItem('user-profile', JSON.stringify(response))
          setProfile(response.data);
          //console.log(response.data)
          //console.log(profile)
        } catch (error) {
          toast.error('Failed to fetch profile.');
          console.error('Error fetching profile:', error);
        }

      };

      fetchProfile();

    }, [token]);

    const handleEditProfile = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleProfileUpdate = (updatedProfile) => {
        setProfile(updatedProfile);
        setShowEditModal(false);
    };

    const userData = localStorage.getItem('user-info')
    const userdetail = JSON.parse(userData)
    const username = userdetail.data.username

    if (!profile) {
        return <div>Loading...</div>;
    }

  return (
    <div className='dashboard flex h-screen bg-white text-black'>

        <Sidemenu />

        <main className="flex flex-col w-full h-screen bg-white-100">

            <img src={profile.cover_image || 'https://via.placeholder.com/150'} alt="Cover" className="w-full h-40 object-cover rounded-t-lg bg-no-repeat" />
            
            <div className='flex justify-between w-11/12 m-auto'>
                
                <div className="flex flex-col w-1/3 border border-blue-800 rounded-t-3xl bg-white p-6 shadow-xl" style={{ zIndex: '999999999', marginTop: '-5em' }}>
                    
                    <div className="text-center">
                        
                        <img src={profile.profile_pic || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 border border-blue-800 rounded-full mx-auto" />
                        
                        <h2 className="text-xl font-semibold mt-4">{profile.first_name} {profile.last_name}</h2>
                        
                        <p className="text-gray-600">@{username}</p>
                        
                        <p className="text-gray-600">Interior Designer</p>
                        
                        <p className="text-gray-600"><i className="fas fa-map-marker-alt"></i>  {profile.location || 'Lagos, Nigeria'} </p>
                        
                        <div className="flex justify-around mt-6">
                            <div className="text-center">
                                <span className="block text-lg font-bold">122</span>
                                <span className="text-gray-600">courses</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-lg font-bold">67</span>
                                <span className="text-gray-600">assignments</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-lg font-bold">37K</span>
                                <span className="text-gray-600">messages</span>
                            </div>
                        
                        </div>
                        
                        <div className="flex mt-6 justify-between items-center">

                            <button onClick={handleEditProfile}
                                className="text-white border-none bg-blue-800 rounded-lg text-center py-2 px-4 text-sm hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black font-semibold"
                            > Edit Profile
                            </button>

                            <Editprofile token={token} show={showEditModal} onClose={handleCloseModal} profile={profile} handleProfileUpdate={handleProfileUpdate} />
                            
                            <button onClick={handleEditProfile}
                                className='text-white border-none bg-red-600 rounded-lg text-center py-2 px-4 text-sm hover:bg-transparent hover:border-solid border-2 border-red-600 hover:text-black font-semibold capitalize'
                            > delete
                            </button>

                        </div>

                    </div>

                </div>

                <div className="flex flex-col w-3/5 p-6">

                    <div className="mt-5">
                        <h3 className="text-lg font-semibold text-gray-900">About</h3>
                        <p className="text-gray-700 mt-2">{profile.bio || 'This user has not added a bio yet.'}</p>
                    </div>

                    <div className="border-b-2 border-gray-200 mb-6">
                        <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600">Photos</button>
                        <button className="py-2 px-4 text-gray-600">Likes</button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <img src="photo1.jpg" alt="Photo 1" className="rounded" />
                        <img src="photo2.jpg" alt="Photo 2" className="rounded" />
                        <img src="photo3.jpg" alt="Photo 3" className="rounded" />
                        <img src="photo4.jpg" alt="Photo 4" className="rounded" />
                        <img src="photo5.jpg" alt="Photo 5" className="rounded" />
                        <img src="photo6.jpg" alt="Photo 6" className="rounded" />
                    </div>

                </div>

            </div>

        </main>

    </div>
  )
}

export default TeacherProfile