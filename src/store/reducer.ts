import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { getOffers, changeCity } from './action';
import { offersMock } from '../mocks/offers';
import { Cities } from '../types/cities';

type OffersState = {
	offers: Offer[];
	city: Cities;
};

const initialState: OffersState = {
	offers: [],
	city: Cities.Paris
};

export const reducer = createReducer(
	initialState,
	(builder) => {
		builder
			.addCase(getOffers, (state, action: PayloadAction<Cities>) => {
				const filteredOffers = offersMock.filter((offer) => offer.city.name === action.payload);

				state.offers = filteredOffers;
			})
			.addCase(changeCity, (state, action: PayloadAction<Cities>) => {
				state.city = action.payload;
			});
	}
);

export default reducer;
