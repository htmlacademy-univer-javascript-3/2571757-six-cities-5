import type { Offer } from '../types/offer';
import type { OfferInfo } from '../types/offer-info';

export const convertOfferInfoToOffer = (offerInfo: OfferInfo): Offer => {
	return {
		id: offerInfo.id,
		title: offerInfo.title,
		type: offerInfo.type,
		price: offerInfo.price,
		city: offerInfo.city,
		location: offerInfo.location,
		isFavorite: offerInfo.isFavorite,
		isPremium: offerInfo.isPremium,
		rating: offerInfo.rating,
		previewImage: offerInfo.images[0] || ''
	};
};
