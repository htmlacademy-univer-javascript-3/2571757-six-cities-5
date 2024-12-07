import { Cities } from '../types/cities';
import { Offer } from '../types/offer';
import { OfferInfo } from '../types/offer-info';

export const mockOfferInfo: OfferInfo = {
	id: '1',
	title: 'Offer 1',
	type: 'apartment',
	price: 100,
	city: {
		name: Cities.Paris,
		location: {
			latitude: 48.8566,
			longitude: 2.3522,
			zoom: 13
		}
	},
	location: {
		latitude: 48.8566,
		longitude: 2.3522,
		zoom: 13
	},
	isFavorite: true,
	isPremium: false,
	rating: 4.5,
	description: 'Description 1',
	bedrooms: 2,
	goods: ['Wi-Fi', 'TV'],
	host: {
		name: 'John Doe',
		avatarUrl: 'avatar1.jpg',
		isPro: true
	},
	images: ['image1.jpg'],
	maxAdults: 4
};

export const mockOffer: Offer = {
	id: '1',
	title: 'Offer 1',
	type: 'apartment',
	price: 100,
	city: {
		name: Cities.Paris,
		location: {
			latitude: 48.8566,
			longitude: 2.3522,
			zoom: 13
		}
	},
	location: {
		latitude: 48.8566,
		longitude: 2.3522,
		zoom: 13
	},
	isFavorite: true,
	isPremium: false,
	rating: 4.5,
	previewImage: 'image1.jpg'
};
