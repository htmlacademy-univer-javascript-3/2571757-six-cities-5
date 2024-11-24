import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchFavoritesOffers } from '../action';

type FavoritesOffersState = {
	favoritesOffers: Offer[];
	loading: boolean;
	error: string | null;
};

const initialState: FavoritesOffersState = {
	favoritesOffers: [],
	loading: false,
	error: null
};

export const favoriteOffersReducer = createReducer(
	initialState,
	(builder) => {
		builder
			.addCase(fetchFavoritesOffers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFavoritesOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
				state.favoritesOffers = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchFavoritesOffers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Something went wrong';
			});
	}
);

export default favoriteOffersReducer;
