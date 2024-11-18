import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchNearestOffers } from '../action';

type OffersState = {
	nearestOffers: Offer[];
	loading: boolean;
	error: string | null;
};

const initialState: OffersState = {
	nearestOffers: [],
	loading: false,
	error: null
};

export const nearestOffersReducer = createReducer(
	initialState,
	(builder) => {
		builder
			.addCase(fetchNearestOffers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchNearestOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
				state.nearestOffers = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchNearestOffers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Something went wrong';
			});
	}
);

export default nearestOffersReducer;
