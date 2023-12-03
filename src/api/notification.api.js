import { request } from './request';

export const deletenotification = (id) => request('delete', `/notification/${id}`);
// notification
export const getnotifications = (data) => request('get', '/notification/getmynotification', data);