import { describe, it, expect } from 'vitest';
import { convertOfferInfoToOffer } from './convert-offer-info-into-offer';
import type { OfferInfo } from '../types/offer-info';
import type { Offer } from '../types/offer';
import { Cities } from '../types/cities';

describe('convertOfferInfoToOffer', () => {
	it('should correctly convert OfferInfo to Offer', () => {
		const offerInfo: OfferInfo = {
			id: '1',
			title: 'Luxury Apartment',
			type: 'apartment',
			price: 100,
			city: {
				name: Cities.Amsterdam,
				location: {
					latitude: 52.5200,
					longitude: 13.4050,
					zoom: 10
				}
			},
			location: {
				latitude: 52.5200,
				longitude: 13.4050,
				zoom: 10
			},
			isFavorite: true,
			isPremium: false,
			rating: 4.5,
			description: 'A luxury apartment in Berlin.',
			bedrooms: 2,
			goods: ['Wi-Fi', 'Air Conditioning'],
			host: {
				name: 'John Doe',
				avatarUrl: 'http://example.com/avatar.jpg',
				isPro: true
			},
			images: ['image1.jpg', 'image2.jpg'],
			maxAdults: 4
		};

		const expectedOffer: Offer = {
			id: '1',
			title: 'Luxury Apartment',
			type: 'apartment',
			price: 100,
			city: offerInfo.city,
			location: offerInfo.location,
			isFavorite: true,
			isPremium: false,
			rating: 4.5,
			previewImage: 'image1.jpg' // The first image should be selected
		};

		const result = convertOfferInfoToOffer(offerInfo);

		expect(result).toEqual(expectedOffer);
	});
});
