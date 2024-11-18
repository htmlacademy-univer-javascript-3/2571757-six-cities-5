import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchOfferInfo } from '../action';
import { OfferInfo } from '../../types/offer-info';

type OfferInfoState = {
	offerInfo?: OfferInfo;
	loading: boolean;
	error: string | null;
};

const initialState: OfferInfoState = {
	offerInfo: undefined,
	loading: false,
	error: null
};

export const offerInfoReducer = createReducer(
	initialState,
	(builder) => {
		builder
			.addCase(fetchOfferInfo.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOfferInfo.fulfilled, (state, action: PayloadAction<OfferInfo>) => {
				state.offerInfo = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchOfferInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Something went wrong';
			});
	}
);

export default offerInfoReducer;
