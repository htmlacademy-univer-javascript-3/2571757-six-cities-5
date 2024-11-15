import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { getOffers, changeCity, getFavoritesOffers, changeSortVariant } from './action';
import { offersMock } from '../mocks/offers';
import { Cities } from '../types/cities';
import { SortVariant } from '../types/sort-variants';

type OffersState = {
	offers: Offer[];
	favoritesOffers: Offer[];
	city: Cities;
	sortVariant: SortVariant;
};

const initialState: OffersState = {
	offers: [],
	favoritesOffers: [],
	city: Cities.Paris,
	sortVariant: SortVariant.Popular
};

export const reducer = createReducer(
	initialState,
	(builder) => {
		builder
			.addCase(getOffers, (state, action: PayloadAction<Cities>) => {
				const filteredOffers = offersMock.filter((offer) => offer.city.name === action.payload);
				state.offers = filteredOffers;
			})
			.addCase(getFavoritesOffers, (state) => {
				state.favoritesOffers = offersMock;
			})
			.addCase(changeCity, (state, action: PayloadAction<Cities>) => {
				state.city = action.payload;
			})
			.addCase(changeSortVariant, (state, action: PayloadAction<SortVariant>) => {
				state.sortVariant = action.payload;
			});
	}
);

export default reducer;
