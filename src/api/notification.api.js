import { request } from './request';

export const getNotification = (data) => request('get', '/notification', data);

