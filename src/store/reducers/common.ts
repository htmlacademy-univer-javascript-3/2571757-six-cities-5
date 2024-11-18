import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { changeCity, changeSortVariant } from '../action';
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

export const commonReducer = createReducer(
	initialState,
	(builder) => {
		builder
			.addCase(changeCity, (state, action: PayloadAction<Cities>) => {
				state.city = action.payload;
			})
			.addCase(changeSortVariant, (state, action: PayloadAction<SortVariant>) => {
				state.sortVariant = action.payload;
			});
	}
);

export default commonReducer;
