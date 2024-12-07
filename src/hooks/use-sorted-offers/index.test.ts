import { Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSortedOffers } from './';
import { Offer } from '../../types/offer';
import { SortVariant } from '../../types/sort-variants';
import { useAppSelector } from '../../store/hooks';
import { mockOffer } from '../../mocks/offers';

vi.mock('../../store/hooks', () => ({
	useAppSelector: vi.fn()
}));

const firstOffer = { ...mockOffer, id: '1', price: 100, rating: 4.5 };
const secondOffer = { ...mockOffer, id: '2', price: 150, rating: 4.3 };
const thirdOffer = { ...mockOffer, id: '3', price: 180, rating: 4.0 };

describe('useSortedOffers', () => {
	const offers: Offer[] = [
		firstOffer,
		secondOffer,
		thirdOffer
	];

	it('should sort offers from low to high price', () => {
		(useAppSelector as Mock).mockReturnValue(SortVariant.LowToHigh);

		const { result } = renderHook(() => useSortedOffers(offers));

		expect(result.current).toEqual([
			firstOffer,
			secondOffer,
			thirdOffer
		]);
	});

	it('should sort offers from high to low price', () => {
		(useAppSelector as Mock).mockReturnValue(SortVariant.HighToLow);

		const { result } = renderHook(() => useSortedOffers(offers));

		expect(result.current).toEqual([
			thirdOffer,
			secondOffer,
			firstOffer
		]);
	});

	it('should sort offers by top rating first', () => {
		(useAppSelector as Mock).mockReturnValue(SortVariant.TopRatedFirst);

		const { result } = renderHook(() => useSortedOffers(offers));

		expect(result.current).toEqual(offers);
	});

	it('should not change the order when sort variant is Popular', () => {
		(useAppSelector as Mock).mockReturnValue(SortVariant.Popular);

		const { result } = renderHook(() => useSortedOffers(offers));

		expect(result.current).toEqual(offers);
	});
});
