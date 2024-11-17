import { AxiosError, AxiosResponse } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../types/cities';
import { SortVariant } from '../types/sort-variants';
import { Paths } from '../api/constants';
import { Offer } from '../types/offer';
import { RootState, ThunkConfig } from './types';
import { AuthorizationRequestDto, ValidationErrorDto } from '../types/auth';
import { UserData } from '../types/user';
import { handleTokenInLocalStorage, removeToken } from './utils';
import { Actions } from '../constants/actions';
import api from '../api';

export const checkAuthStatus = createAsyncThunk<UserData, void, ThunkConfig<unknown>>(
	Actions.CHECK_AUTH_STATUS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<void, AxiosResponse<UserData>>(Paths.Login);
			handleTokenInLocalStorage(response.data.token);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);


export const authorize = createAsyncThunk<UserData, AuthorizationRequestDto, ThunkConfig<AxiosError<ValidationErrorDto>>>(
	Actions.AUTHORIZE,
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await api.post<UserData>(Paths.Login, { email, password });
			handleTokenInLocalStorage(response.data.token);

			return response.data;
		} catch (error) {
			return rejectWithValue(error as AxiosError<ValidationErrorDto>);
		}
	}
);

export const logout = createAsyncThunk<void, void, ThunkConfig<unknown>>(
	Actions.LOGOUT,
	async (_, { rejectWithValue }) => {
		try {
			await api.delete(Paths.Logout);
			removeToken();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchOffers = createAsyncThunk<Offer[], void, ThunkConfig<unknown>>(
	Actions.FETCH_OFFERS,
	async (_, { rejectWithValue, getState }) => {
		const city = getState().common.city;

		try {
			const response = await api.get<Offer[]>(Paths.FetchOffers);
			const filteredOffers = response.data.filter((offer) => offer.city.name === city);

			return filteredOffers;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchFavoritesOffers = createAsyncThunk<Offer[], void, { state: RootState }>(
	Actions.FETCH_OFFERS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<Offer[]>(Paths.FetchFavoritesOffers);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const changeCity = createAction<Cities>(Actions.CHANGE_CITY);

export const changeSortVariant = createAction<SortVariant>(Actions.CHANGE_SORT_VARIANT);
