import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://medal.onrender.com/api',
    // baseURL: 'http://localhost:3001/api',
    // timeout: 6000,
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    config => {
        return config?.data;
    },
    error => {
        let errorMessage = 'error';
        if (error?.message?.includes('Network Error')) {
            errorMessage = 'network connection error!';
        } else {
            errorMessage = error?.message;
        }
        return {
            status: false,
            message: errorMessage,
            result: null,
        };
    },
);

export const request = (method, url, data, config) => {
    const token = localStorage.getItem('token')
    switch (method) {
        case 'post':
            return axiosInstance.post(url, { ...data, token }, config);
        case 'get':
            return axiosInstance.get(url, { params: { ...data, token }, ...config });
        case 'delete':
            return axiosInstance.delete(url, { params: { ...data, token }, ...config });
        case 'put':
            return axiosInstance.put(url, { ...data, token }, config);
        default:
            break;
    }
};