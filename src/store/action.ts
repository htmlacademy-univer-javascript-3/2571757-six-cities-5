import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferInfo } from '../types/offer-info';
import { Paths } from '../api/constants';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { ErrorResponse, ThunkConfig } from './types';
import { AuthorizationRequestDto } from '../types/auth';
import { UserData } from '../types/user';
import { handleTokenInLocalStorage, removeToken } from './utils';
import { Actions } from '../constants/actions';
import { CommentFormState } from '../types/comment';
import { sortCommentsByDate } from '../utils/sort-by-date';
import { handleApiError } from './utils/handle-api-error';
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

export const logout = createAsyncThunk<void, void, ThunkConfig<unknown>>(
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

export const fetchOfferInfo = createAsyncThunk<OfferInfo, { offerId: string }, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_OFFER,
	async ({ offerId }, { rejectWithValue }) => {
		try {
			const response = await api.get<OfferInfo>(Paths.FetchOfferInfo.replace('{offerId}', offerId));

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const fetchOffers = createAsyncThunk<Offer[], void, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_OFFERS,
	async (_, { rejectWithValue, getState }) => {
		const city = getState().common.city;

		try {
			const response = await api.get<Offer[]>(Paths.FetchOffers);
			const filteredOffers = response.data.filter((offer) => offer.city.name === city);

			return filteredOffers;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const fetchNearestOffers = createAsyncThunk<Offer[], { offerId: string }, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_NEAREST_OFFERS,
	async ({ offerId }, { rejectWithValue }) => {
		try {
			const response = await api.get<Offer[]>(Paths.FetchNearestOffers.replace('{offerId}', offerId));

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const fetchFavoritesOffers = createAsyncThunk<Offer[], void, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_FAVORITES_OFFERS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<Offer[]>(Paths.FetchFavoritesOffers);

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const fetchOfferComments = createAsyncThunk<Comment[], { offerId: string }, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_OFFER_COMMENTS,
	async ({ offerId }, { rejectWithValue }) => {
		try {
			const response = await api.get<Comment[]>(Paths.OfferComments.replace('{offerId}', offerId));

			return sortCommentsByDate(response.data);
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const postOfferComment = createAsyncThunk<Comment, { offerId: string } & CommentFormState, ThunkConfig<ErrorResponse>>(
	Actions.POST_OFFER_COMMENT,
	async ({ offerId, comment, rating }, { rejectWithValue }) => {
		try {
			const response = await api.post<Comment>(Paths.OfferComments.replace('{offerId}', offerId), { comment, rating });

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
