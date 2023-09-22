import { message as $message } from 'antd';
import axios from 'axios';
import { store } from '../redux/store';
import { setLoading } from '../redux/userSlice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    // timeout: 6000,
});

axiosInstance.interceptors.request.use(
    config => {
        // store.dispatch(
        //     setLoading(true),
        // );
        return config;
    },
    error => {
        // store.dispatch(
        //     setLoading(false),
        // );
        Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    config => {
        // store.dispatch(
        //     setLoading(true),
        // );
        return config?.data;
    },
    error => {
        // store.dispatch(
        //     setLoading(false),
        // );
        let errorMessage = 'error';
        if (error?.message?.includes('Network Error')) {
            errorMessage = 'network connection error!';
        } else {
            errorMessage = error?.message;
        }
        error.message && $message.error(errorMessage);
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