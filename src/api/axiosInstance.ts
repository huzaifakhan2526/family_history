import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://family-history.chaptervitamins.com',
});


export default axiosInstance;
