import { decodeSortVariant } from './';
import { SortVariant } from '../../../types/sort-variants';

describe('decodeSortVariant', () => {
	it('should return "Popular" for SortVariant.Popular', () => {
		const result = decodeSortVariant(SortVariant.Popular);
		expect(result).toBe('Popular');
	});

	it('should return "Price: low to high" for SortVariant.LowToHigh', () => {
		const result = decodeSortVariant(SortVariant.LowToHigh);
		expect(result).toBe('Price: low to high');
	});

	it('should return "Price: high to low" for SortVariant.HighToLow', () => {
		const result = decodeSortVariant(SortVariant.HighToLow);
		expect(result).toBe('Price: high to low');
	});

	it('should return "Top rated first" for SortVariant.TopRatedFirst', () => {
		const result = decodeSortVariant(SortVariant.TopRatedFirst);
		expect(result).toBe('Top rated first');
	});

	it('should return undefined for an unknown SortVariant', () => {
		const result = decodeSortVariant('Unknown' as unknown as SortVariant);
		expect(result).toBeUndefined();
	});
});
