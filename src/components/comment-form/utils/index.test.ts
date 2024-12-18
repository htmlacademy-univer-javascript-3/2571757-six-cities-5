import { getRatingTitle } from './';

describe('getRatingTitle', () => {
	it('should return "perfect" for rating 5', () => {
		expect(getRatingTitle(5)).toBe('perfect');
	});

	it('should return "good" for rating 4', () => {
		expect(getRatingTitle(4)).toBe('good');
	});

	it('should return "not bad" for rating 3', () => {
		expect(getRatingTitle(3)).toBe('not bad');
	});

	it('should return "badly" for rating 2', () => {
		expect(getRatingTitle(2)).toBe('badly');
	});

	it('should return "terribly" for rating 1', () => {
		expect(getRatingTitle(1)).toBe('terribly');
	});

	it('should return an empty string for an invalid rating', () => {
		expect(getRatingTitle(0)).toBe('');
		expect(getRatingTitle(6)).toBe('');
		expect(getRatingTitle(-1)).toBe('');
		expect(getRatingTitle(10)).toBe('');
	});

	it('should return an empty string for non-integer values', () => {
		expect(getRatingTitle(2.5)).toBe('');
		expect(getRatingTitle(NaN)).toBe('');
		expect(getRatingTitle(undefined as unknown as number)).toBe('');
		expect(getRatingTitle(null as unknown as number)).toBe('');
	});
});
