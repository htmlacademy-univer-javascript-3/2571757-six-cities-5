import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizationRequestDto } from '../../../types/auth';
import { UserData } from '../../../types/user';
import { handleTokenInLocalStorage, removeToken } from '../../utils';
import { Actions } from '../../../constants/actions';
import { ErrorResponse, ThunkConfig } from '../../types';
import { Paths } from '../../../api/constants';
import { handleApiError } from '../../utils/handle-api-error';
import api from '../../../api';

export const checkAuthStatus = createAsyncThunk<UserData, void, ThunkConfig<ErrorResponse>>(
	Actions.CHECK_AUTH_STATUS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<void, AxiosResponse<UserData>>(Paths.Login);
			handleTokenInLocalStorage(response.data.token);

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const authorize = createAsyncThunk<UserData, AuthorizationRequestDto, ThunkConfig<ErrorResponse>>(
	Actions.AUTHORIZE,
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await api.post<UserData>(Paths.Login, { email, password });
			handleTokenInLocalStorage(response.data.token);

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const logout = createAsyncThunk<void, void, ThunkConfig<ErrorResponse>>(
	Actions.LOGOUT,
	async (_, { rejectWithValue }) => {
		try {
			await api.delete(Paths.Logout);
			removeToken();
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
