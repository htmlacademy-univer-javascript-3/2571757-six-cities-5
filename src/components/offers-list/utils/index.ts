import { OfferPreviewType } from '../../../types/offer';

export const calculateClassName = (listType: OfferPreviewType) => {
	switch (listType) {
		case 'favorites':
			return 'favorites__places';
		case 'nearest':
			return 'near-places__list places__list';
		default:
			return 'cities__places-list places__list tabs__content';
	}
};
