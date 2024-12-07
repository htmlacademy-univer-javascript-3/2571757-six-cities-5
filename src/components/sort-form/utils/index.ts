import { SortVariant } from '../../../types/sort-variants';

export const decodeSortVariant = (variant: SortVariant) => {
	switch (variant) {
		case SortVariant.Popular:
			return 'Popular';
		case SortVariant.LowToHigh:
			return 'Price: low to high';
		case SortVariant.HighToLow:
			return 'Price: high to low';
		case SortVariant.TopRatedFirst:
			return 'Top rated first';
	}
};
