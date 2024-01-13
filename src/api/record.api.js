import { request } from './request';
//user infomation
export const uploadrecord = (data) => request('post', `/record`, data);
export const deleterecord = (id) => request('delete', `/record/${id}`);
export const getrecords = () => request('get', `/record/`);
export const getrecordsbyuserid = (userId) => request('get', `/record/${userId}`);
export const getlatestrecord = () => request('get', `/record/latest`);