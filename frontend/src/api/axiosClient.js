import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3030/api', // TODO: Change this to the actual API URL
});

axiosClient.interceptors.request.use((config) => {
    if (!config.url.includes('/register') && !config.url.includes('/login') && config.url !== '/jurusan') {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
        throw error;
    }
);

export default axiosClient;