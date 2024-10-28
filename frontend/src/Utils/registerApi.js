import axios from 'axios';

export const registerUser = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/register/', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};
