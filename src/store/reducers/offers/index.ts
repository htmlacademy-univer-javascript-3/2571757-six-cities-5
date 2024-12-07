import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../../types/offer';
import { fetchOffers, changeFavoriteStatus } from '../../actions';
import { OfferInfo } from '../../../types/offer-info';
import { ErrorResponse } from '../../types';

export type OffersState = {
	offers: Offer[];
	loading: boolean;
	error?: string | null;
};

export const initialState: OffersState = {
	offers: [],
	loading: false,
	error: null
};

const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOffers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
				state.offers = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchOffers.rejected, (state, { payload }: PayloadAction<ErrorResponse | undefined>) => {
				state.loading = false;
				state.error = payload?.message;
			})
			.addCase(changeFavoriteStatus.fulfilled, (state, action: PayloadAction<OfferInfo>) => {
				const updatedOffer = action.payload;
				const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);

				if (offerIndex !== -1) {
					state.offers[offerIndex] = {
						...state.offers[offerIndex],
						isFavorite: updatedOffer.isFavorite
					};
				}
			});
	}
});

export const { reducer: offersReducer } = offersSlice;
