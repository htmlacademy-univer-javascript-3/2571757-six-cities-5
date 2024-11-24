import { Dispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from './';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkExtraArgs {
    api: AxiosInstance;
}

export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArgs;
    dispatch?: Dispatch;
    state: RootState;
}

export type RequestStatus = {
	loading: boolean;
	error?: string | null;
	validationErrors?: Record<string, string>;
};

export type ErrorResponse = {
	errorType?: string;
	message?: string;
	details?: { property: string; value: string; messages: string[] }[];
}
