import type { OfferCity, OfferLocation, OfferType } from './offer';

type OfferHost = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
};

export type OfferInfo = {
	id: string;
	title: string;
	type: OfferType;
	price: number;
	city: OfferCity;
	location: OfferLocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	description: string;
	bedrooms: number;
	goods: string[];
	host: OfferHost;
	images: string[];
	maxAdults: number;
};
