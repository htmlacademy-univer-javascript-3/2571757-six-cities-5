import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferRequestStatus } from '../../../types/offer';
import { ErrorResponse, ThunkConfig } from '../../types';
import { Actions } from '../../../constants/actions';
import { handleApiError } from '../../utils/handle-api-error';
import { OfferInfo } from '../../../types/offer-info';
import { Paths } from '../../../api/constants';
import api from '../../../api';

export const fetchFavoritesOffers = createAsyncThunk<Offer[], void, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_FAVORITES_OFFERS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<Offer[]>(Paths.FavoritesOffers);

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const changeFavoriteStatus = createAsyncThunk<OfferInfo, { offerId: string; status: OfferRequestStatus }, ThunkConfig<ErrorResponse>>(
	Actions.CHANGE_FAVORITE_STATUS,
	async ({ offerId, status }, { rejectWithValue }) => {
		try {
			const response = await api.post<OfferInfo>(`${Paths.FavoritesOffers}/${offerId}/${status}`);

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
