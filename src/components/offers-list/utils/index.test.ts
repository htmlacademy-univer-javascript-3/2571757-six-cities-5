import { calculateClassName } from './';
import { OfferPreviewType } from '../../../types/offer';

describe('calculateClassName', () => {
	it('should return "favorites__places" for the "favorites" list type', () => {
		const result = calculateClassName('favorites');
		expect(result).toBe('favorites__places');
	});

	it('should return "near-places__list places__list" for the "nearest" list type', () => {
		const result = calculateClassName('nearest');
		expect(result).toBe('near-places__list places__list');
	});

	it('should return default class for an undefined list type', () => {
		const result = calculateClassName('unknown' as OfferPreviewType);
		expect(result).toBe('cities__places-list places__list tabs__content');
	});

	it('should return default class for an empty string', () => {
		const result = calculateClassName('' as OfferPreviewType);
		expect(result).toBe('cities__places-list places__list tabs__content');
	});

	it('should return default class for null or undefined input', () => {
		expect(calculateClassName(null as unknown as OfferPreviewType)).toBe(
			'cities__places-list places__list tabs__content'
		);
		expect(calculateClassName(undefined as unknown as OfferPreviewType)).toBe(
			'cities__places-list places__list tabs__content'
		);
	});
});
