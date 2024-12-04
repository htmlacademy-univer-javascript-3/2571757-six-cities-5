import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offer';
import { changeFavoriteStatus, fetchNearestOffers } from '../../action';
import { OfferInfo } from '../../../types/offer-info';
import { ErrorResponse } from '../../types';

export type OffersState = {
	nearestOffers: Offer[];
	loading: boolean;
	error?: string | null;
};

export const initialState: OffersState = {
	nearestOffers: [],
	loading: false,
	error: null
};

const nearestOffersSlice = createSlice({
	name: 'nearestOffers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
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
			.addCase(fetchNearestOffers.rejected, (state, { payload }: PayloadAction<ErrorResponse | undefined>) => {
				state.loading = false;
				state.error = payload?.message;
			})
			.addCase(changeFavoriteStatus.fulfilled, (state, action: PayloadAction<OfferInfo>) => {
				const updatedOffer = action.payload;
				const offerIndex = state.nearestOffers.findIndex((offer) => offer.id === updatedOffer.id);

				if (offerIndex !== -1) {
					state.nearestOffers[offerIndex] = {
						...state.nearestOffers[offerIndex],
						isFavorite: updatedOffer.isFavorite
					};
				}
			});
	}
});

export const { reducer: nearestOffersReducer } = nearestOffersSlice;
