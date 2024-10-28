import axios from 'axios';

export const loginUser = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/login/', data); 
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data || { error: 'An error occurred during login' };
    }
};
