import axios from 'axios';
import { ErrorResponse } from '../types';

export function handleApiError(error: unknown): ErrorResponse {
	if (axios.isAxiosError<ErrorResponse>(error)) {
		if (error.code === 'ERR_NETWORK') {
			return {
				errorType: 'NETWORK_ERROR',
				message: 'Unable to connect to the server. Please check your network connection.'
			};
		}

		const { status, data } = error.response || {};

		switch (status) {
			case 400:
				return { errorType: data?.errorType, message: data?.message, details: data?.details };
			case 401:
				return { errorType: data?.errorType, message: data?.message || 'Unauthorized access' };
			case 404:
				return { errorType: data?.errorType, message: data?.message || 'Offer not found' };
			default:
				return { errorType: 'UNKNOWN_ERROR', message: 'An unknown error occurred' };
		}
	}

	return { errorType: 'UNEXPECTED_ERROR', message: 'Unexpected error occurred' };
}
