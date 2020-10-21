import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'https://burger-app-be7b5.firebaseio.com/'
});

export default axiosInstance;