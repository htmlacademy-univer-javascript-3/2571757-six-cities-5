import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer';
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

const favoriteOffersSlice = createSlice({
	name: 'favoriteOffers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
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
});

export const { reducer: favoriteOffersReducer } = favoriteOffersSlice;
