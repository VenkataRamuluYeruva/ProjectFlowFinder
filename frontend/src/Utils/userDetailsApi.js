import axios from 'axios';

const fetchUserDetails = async () => {
    try {
        const response = await axios.get('http://localhost:8000/auth/userdetails', {
            headers: {
                Authorization: 'Apikey 63b561e1-346e-4e52-9888-9a259691bd76'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
export { fetchUserDetails };
    