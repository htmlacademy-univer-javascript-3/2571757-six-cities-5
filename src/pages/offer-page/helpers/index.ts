import { Offer } from '../../../types/offer';
import { OfferInfo } from '../../../types/offer-info';

export function pluralize(count: number, words: string[]) {
	const pluralRules = new Intl.PluralRules('en', { type: 'ordinal' });
	const pluralForm = pluralRules.select(count);

	switch (pluralForm) {
		case 'one':
			return `${count} ${words[0]}`;
		default:
			return `${count} ${words[1]}`;
	}
}

export const mapOfferInfoIntoOffer = (offerInfo: OfferInfo): Offer => ({
	id: offerInfo.id,
	previewImage: '',
	title: offerInfo.title,
	type: offerInfo.type,
	price: offerInfo.price,
	city: offerInfo.city,
	location: offerInfo.location,
	isFavorite: offerInfo.isFavorite,
	isPremium: offerInfo.isPremium,
	rating: offerInfo.rating
});
