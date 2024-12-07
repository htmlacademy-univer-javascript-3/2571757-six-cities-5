import { calculateRatingWidth } from './calculate-rating-width';

describe('calculateRatingWidth', () => {
	it('should return the correct width for a rating of 4.5', () => {
		expect(calculateRatingWidth(4.5)).toBe('100%');
	});

	it('should return the correct width for a rating of 3', () => {
		expect(calculateRatingWidth(3)).toBe('60%');
	});

	it('should return the correct width for a rating of 0', () => {
		expect(calculateRatingWidth(0)).toBe('0%');
	});

	it('should round down a rating of 4.2 to 4', () => {
		expect(calculateRatingWidth(4.2)).toBe('80%');
	});

	it('should return the correct width for a rating of 5', () => {
		expect(calculateRatingWidth(5)).toBe('100%');
	});

	it('should return the correct width for a rating of 1', () => {
		expect(calculateRatingWidth(1)).toBe('20%');
	});
});
