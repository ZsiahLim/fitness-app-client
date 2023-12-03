import { request } from './request';
//user infomation
export const uploadmeasurement = (data) => request('post', `/measurement/`, data);
export const deletemeasurement = (id) => request('delete', `/measurement/${id}`);
export const getmeasurements = () => request('get', `/measurement/`);
export const getlatestmeasurement = () => request('get', `/measurement/latest`);