type OfferType = 'apartment';

type OfferLocation = {
	latitude: number;
	longitude: number;
	zoom: number;
};

type OfferCity = {
	name: string;
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
	rating: 1 | 2 | 3 | 4 | 5;
	previewImage: string;
};
