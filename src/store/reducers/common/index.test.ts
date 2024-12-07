import { describe, it, expect } from 'vitest';
import { commonReducer, commonActions } from './index';
import { Cities } from '../../../types/cities';
import { SortVariant } from '../../../types/sort-variants';

describe('commonReducer', () => {
	it('should return the initial state', () => {
		const initialState = {
			city: Cities.Paris,
			sortVariant: SortVariant.Popular
		};

		expect(commonReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle changeCity', () => {
		const initialState = {
			city: Cities.Paris,
			sortVariant: SortVariant.Popular
		};

		const newState = commonReducer(initialState, commonActions.changeCity(Cities.Cologne));

		expect(newState).toEqual({
			...initialState,
			city: Cities.Cologne
		});
	});

	it('should handle changeSortVariant', () => {
		const initialState = {
			city: Cities.Paris,
			sortVariant: SortVariant.Popular
		};

		const newState = commonReducer(initialState, commonActions.changeSortVariant(SortVariant.LowToHigh));

		expect(newState).toEqual({
			...initialState,
			sortVariant: SortVariant.LowToHigh
		});
	});
});
