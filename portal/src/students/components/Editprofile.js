import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';

const Editprofile = ({ token, show, onClose, profile, handleProfileUpdate  }) => {

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        phone_number: profile.phone_number,
        gender: profile.gender,
        location: profile.location,
        profile_pic: null,
        cover_image: null,
    });

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: files[0]
            }));
        }
    };

    /*const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                profile_pic: file
            }));
        }
    };*/

    const handleSubmit = async (e) => {

        e.preventDefault();

        const updatedProfile = new FormData();

        for (const key in formData) {
            if (formData[key] !== null) {
                updatedProfile.append(key, formData[key]);
            }
        }
        updatedProfile.append('first_name', formData.first_name);
        updatedProfile.append('last_name', formData.last_name);
        updatedProfile.append('bio', formData.bio);
        if (formData.profile_pic) {
            updatedProfile.append('profile_pic', formData.profile_pic);
        }

        try {
            const response = await axiosInstance.patch(`/profiles/${profile.id}/`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profile updated successfully!');
            handleProfileUpdate(response.data);
            //console.log(response.data)
            setError(null);
            onClose();
        } catch (err) {
            setError('Error updating profile');
            toast.error('Error updating profile.');
            console.error('Error updating profile:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    if (!show) {
        return null;
    }

    return (
        <div className='modal-backdrop' show={show.toString()} onClose={onClose}>

            <div className="modal-content">

                <span className="close-button" onClick={onClose}>&times;</span>

                <h2 className="mt-4 font-bold text-lg text-blue-700">Edit Profile</h2>

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <form onSubmit={handleSubmit} className='flex flex-col items-center w-full mt-6' encType="multipart/form-data">
                    
                    <div className='flex justify-between items-center w-full'>

                        <label className='text-left font-semibold mb-4 text-blue-700'> First Name: <br />
                            <input type="text" name='first_name' value={formData.first_name} onChange={handleChange} required
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-72 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                        <label className='text-left font-semibold mb-4 text-blue-700'> Last Name: <br />
                            <input type="text" name='last_name' value={formData.last_name} onChange={handleChange} required
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-72 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                    </div>

                    <div className='flex justify-between items-center w-full'>

                        <label className='text-left font-semibold mb-4 text-blue-700'> Profile Pic: <br />
                            <input type="file" name="profile_pic" accept="image/*" onChange={handleImageChange}
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-72 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                        <label className='text-left font-semibold mb-4 text-blue-700'> Cover Image: <br />
                            <input type="file" name="cover_image" accept="image/*" onChange={handleImageChange}
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-72 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                    </div>

                    <div className='flex justify-between items-center w-full'>

                        <label className='text-left font-semibold mb-4 text-blue-700'> Phone Number: <br />
                            <input type="text" name='phone_number' value={formData.phone_number} onChange={handleChange} required
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-72 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                        <label className='text-left font-semibold mb-4 text-blue-700'> Location: <br />
                            <input type="text" name='location' value={formData.location} onChange={handleChange} required
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-72 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                    </div>

                    <div className='flex justify-between items-center w-full'>

                        <label className='text-left font-semibold mb-4 text-blue-700'> Bio: <br />
                            <textarea name='bio' value={formData.bio} onChange={handleChange} required
                                className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
                            />
                        </label>

                        <label className='text-left font-semibold text-blue-700'> Gender:  <br />
                        <select name="gender" value={formData.gender} onChange={handleChange} required
                            className='border-solid border-2 border-black text-sm rounded-md px-4 py-1 outline-none w-72 mb-4 font-semibold'
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        </label>

                    </div>

                    <button id='modalbtn' type="submit"
                        className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black font-semibold'
                    > Update Profile
                    </button>

                </form>

            </div>
            
        </div>
    );
}

export default Editprofile;
