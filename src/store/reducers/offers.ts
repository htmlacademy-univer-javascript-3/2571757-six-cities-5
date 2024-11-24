import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer';
import { fetchOffers } from '../action';

type OffersState = {
	offers: Offer[];
	loading: boolean;
	error: string | null;
};

const initialState: OffersState = {
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
			.addCase(fetchOffers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Something went wrong';
			});
	}
});

export const { reducer: offersReducer } = offersSlice;
