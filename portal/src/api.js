// api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';  // Update with your Django backend URL

export const fetchEnrolledCourses = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/courses/enrolled/`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Pass token for authentication
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAssignments = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/assignments/`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Pass token for authentication
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAssignmentById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/assignment/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitAssignment = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/submissions/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


