import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from './';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkExtraArgs {
    api: AxiosInstance;
}

export type ThunkConfig<T> = {
    rejectValue: T;
    extra: AxiosInstance;
    dispatch?: AppDispatch;
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

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<() => AxiosInstance>, Action>;
