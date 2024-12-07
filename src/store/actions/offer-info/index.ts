import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferInfo } from '../../../types/offer-info';
import { ErrorResponse, ThunkConfig } from '../../types';
import { Actions } from '../../../constants/actions';
import { handleApiError } from '../../utils/handle-api-error';
import { Paths } from '../../../api/constants';
import api from '../../../api';

export const fetchOfferInfo = createAsyncThunk<OfferInfo, { offerId: string }, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_OFFER,
	async ({ offerId }, { rejectWithValue }) => {
		try {
			const response = await api.get<OfferInfo>(Paths.OfferInfo.replace('{offerId}', offerId));

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
