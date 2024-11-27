import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cities } from '../../types/cities';
import { SortVariant } from '../../types/sort-variants';

type CommonState = {
	city: Cities;
	sortVariant: SortVariant;
};

const initialState: CommonState = {
	city: Cities.Paris,
	sortVariant: SortVariant.Popular
};

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		changeCity(state, action: PayloadAction<Cities>) {
			state.city = action.payload;
		},
		changeSortVariant(state, action: PayloadAction<SortVariant>) {
			state.sortVariant = action.payload;
		}
	}
});

export const { actions: commonActions } = commonSlice;
export const { reducer: commonReducer } = commonSlice;
