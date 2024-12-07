import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, ThunkConfig } from '../../types';
import { Offer } from '../../../types/offer';
import { Actions } from '../../../constants/actions';
import { Paths } from '../../../api/constants';
import { handleApiError } from '../../utils/handle-api-error';
import api from '../../../api';

export const fetchOffers = createAsyncThunk<Offer[], void, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_OFFERS,
	async (_, { rejectWithValue, getState }) => {
		const city = getState().common.city;

		try {
			const response = await api.get<Offer[]>(Paths.Offers);
			const filteredOffers = response.data.filter((offer) => offer.city.name === city);

			return filteredOffers;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
