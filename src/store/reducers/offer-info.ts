import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { changeFavoriteStatus, fetchOfferInfo } from '../action';
import { OfferInfo } from '../../types/offer-info';
import { ErrorResponse } from '../types';

type OfferInfoState = {
	offerInfo?: OfferInfo;
	loading: boolean;
	error?: string | null;
};

const initialState: OfferInfoState = {
	offerInfo: undefined,
	loading: false,
	error: null
};

const offerInfoSlice = createSlice({
	name: 'offerInfo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
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
			.addCase(fetchOfferInfo.rejected, (state, { payload }: PayloadAction<ErrorResponse | undefined>) => {
				state.loading = false;
				state.error = payload?.message;
			})
			.addCase(changeFavoriteStatus.fulfilled, (state, action: PayloadAction<OfferInfo>) => {
				const updatedOffer = action.payload;
				const isCurrentOfferUpdated = state.offerInfo?.id === updatedOffer.id;

				if (isCurrentOfferUpdated) {
					state.offerInfo = updatedOffer;
				}
			});
	}
});

export const { reducer: offerInfoReducer } = offerInfoSlice;
