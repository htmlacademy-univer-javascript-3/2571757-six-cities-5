import axios, { AxiosInstance } from 'axios';
import { BASE_URL, TIMEOUT } from './constants';

const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT
});

export default api;
