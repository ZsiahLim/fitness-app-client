import { request } from './request';
//user infomation
export const createsession = (data) => request('post', `/session/`, data);
export const getsessions = () => request('get', `/session/`);
export const deletesession = (id) => request('delete', `/session/${id}`);

export const finishsession = (tutorialId, data) => request('put', `/session/finishsession/${tutorialId}`, data);
