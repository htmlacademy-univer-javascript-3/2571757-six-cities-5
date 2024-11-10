import { Offer } from '../types/offer.ts';

export const offersMock: Offer[] = [
	{
		id: '1',
		title: 'First Location',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam',
			location: {
				latitude: 52.35514938496378,
				longitude: 4.673877537499948,
				zoom: 8
			}
		},
		location: {
			latitude: 52.3909553943508,
			longitude: 4.85309666406198,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4,
		previewImage: 'https://url-to-image/image.png'
	},
	{
		id: '2',
		title: 'Second Location',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam',
			location: {
				latitude: 52.35514938496378,
				longitude: 4.673877537499948,
				zoom: 8
			}
		},
		location: {
			latitude: 52.3609553943508,
			longitude: 4.85309666406198,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4,
		previewImage: 'https://url-to-image/image.png'
	},
	{
		id: '3',
		title: 'Third Location',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam',
			location: {
				latitude: 52.35514938496378,
				longitude: 4.673877537499948,
				zoom: 8
			}
		},
		location: {
			latitude: 52.3909553943508,
			longitude: 4.929309666406198,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4,
		previewImage: 'https://url-to-image/image.png'
	},
	{
		id: '4',
		title: 'Third Location',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam',
			location: {
				latitude: 52.35514938496378,
				longitude: 4.673877537499948,
				zoom: 8
			}
		},
		location: {
			latitude: 52.3309553943508,
			longitude: 4.999309666406198,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4,
		previewImage: 'https://url-to-image/image.png'
	}
];
