import { Cities } from './cities';

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

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

export enum OfferRequestStatus {
	Remove = 0,
	Add = 1
}

export type OfferPreviewType = 'favorites' | 'nearest' | 'default';

