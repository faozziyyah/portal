import React, { createContext, useState, useEffect } from 'react';

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const userProfile = localStorage.getItem('user-profile');
        if (userProfile) {
            setProfile(JSON.parse(userProfile));
        }
    }, []);

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
        localStorage.setItem('user-profile', JSON.stringify(newProfile));
    };

    return (
        <UserProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};
