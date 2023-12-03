import { request } from './request';

export const createTutorial = (data) => request('post', '/tutorials', data);

export const getAllTutorials = () => request('get', '/tutorials');

export const getspecifictutorial = (id) => request('get', `/tutorials/find/${id}`);

export const updateTutorial = (id, data) => request('put', `/tutorials/${id}`, data);

export const deleteTutorial = (id, data) => request('delete', `/tutorials/${id}`);

export const addtutorialtofavor = (id) => request("put", `/tutorials/addtofavor/${id}`)

export const getspecifictypetutorials = (data) => request("get", `/tutorials/type`, data)
