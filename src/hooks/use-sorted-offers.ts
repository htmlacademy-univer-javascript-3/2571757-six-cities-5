import { useMemo } from 'react';
import { Offer } from '../types/offer';
import { SortVariant } from '../types/sort-variants';
import { useAppSelector } from '../store/hooks';
import { selectSortVariant } from '../store/selectors';

export const useSortedOffers = (offers: Offer[]): Offer[] => {
	const sortVariant = useAppSelector(selectSortVariant);

	const sortedOffers = useMemo(() => [...offers].sort((a, b) => {
		switch (sortVariant) {
			case SortVariant.LowToHigh:
				return a.price - b.price;
			case SortVariant.HighToLow:
				return b.price - a.price;
			case SortVariant.TopRatedFirst:
				return b.rating - a.rating;
			case SortVariant.Popular:
				return 0;
		}
	}), [offers, sortVariant]);

	return sortedOffers;
};
