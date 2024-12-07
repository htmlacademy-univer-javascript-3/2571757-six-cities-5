import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offer';
import { Actions } from '../../../constants/actions';
import { Paths } from '../../../api/constants';
import { ErrorResponse, ThunkConfig } from '../../types';
import { handleApiError } from '../../utils/handle-api-error';
import api from '../../../api';

export const fetchNearestOffers = createAsyncThunk<Offer[], { offerId: string }, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_NEAREST_OFFERS,
	async ({ offerId }, { rejectWithValue }) => {
		try {
			const response = await api.get<Offer[]>(Paths.NearestOffers.replace('{offerId}', offerId));

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
