import { describe, it, expect, vi } from 'vitest';
import { generateRandomCity } from './generage-random-city';
import { CITIES } from '../constants/cities';

describe('generateRandomCity', () => {
	it('should return a city from the CITIES array', () => {
		const city = generateRandomCity();

		expect(CITIES).toContain(city);
	});

	it('should always return a city from the CITIES array', () => {
		const iterations = 100;
		for (let i = 0; i < iterations; i++) {
			const city = generateRandomCity();
			expect(CITIES).toContain(city);
		}
	});

	it('should return different cities on multiple calls', () => {
		const originalRandom = Math.random;
		vi.spyOn(Math, 'random')
			.mockReturnValueOnce(0.1)
			.mockReturnValueOnce(0.9);

		const firstCity = generateRandomCity();
		const secondCity = generateRandomCity();

		expect(firstCity).not.toBe(secondCity);

		Math.random = originalRandom;
	});
});
