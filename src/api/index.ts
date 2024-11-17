import axios, { AxiosError, AxiosInstance } from 'axios';
import { BASE_URL, TIMEOUT } from './constants';
import { getToken, removeToken } from '../store/utils';

const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT
});

api.interceptors.request.use((config) => {
	const token = getToken();

	if (token) {
		config.headers['X-Token'] = token;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			removeToken();
		}

		return Promise.reject(error);
	}
);

export default api;
