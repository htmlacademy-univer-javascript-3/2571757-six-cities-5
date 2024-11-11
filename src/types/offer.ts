import { Cities } from './cities';

type OfferType = 'apartment';

export type OfferLocation = {
	latitude: number;
	longitude: number;
	zoom: number;
};

export type OfferCity = {
	name: Cities;
	location: OfferLocation;
};

export type Offer = {
	id: string;
	title: string;
	type: OfferType;
	price: number;
	city: OfferCity;
	location: OfferLocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	previewImage: string;
};

export type OfferPreviewType = 'favorites' | 'nearest' | 'default';

