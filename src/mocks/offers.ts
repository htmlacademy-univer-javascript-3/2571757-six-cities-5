import { Cities } from '../types/cities.ts';
import { Offer } from '../types/offer.ts';

export const offersMock: Offer[] = [
	{
		id: '1',
		title: 'First Location Amsterdam',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam' as Cities,
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
		isPremium: true,
		rating: 4,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '2',
		title: 'Second Location Amsterdam',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam' as Cities,
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
		previewImage: '../../public/img/apartment-01.jpg'
	},
	{
		id: '3',
		title: 'Third Location Amsterdam',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam' as Cities,
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
		previewImage: '../../public/img/apartment-02.jpg'
	},
	{
		id: '4',
		title: 'Fourth Location Amsterdam',
		type: 'apartment',
		price: 120,
		city: {
			name: 'Amsterdam' as Cities,
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
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '5',
		title: 'First Location Paris',
		type: 'apartment',
		price: 140,
		city: {
			name: 'Paris' as Cities,
			location: {
				latitude: 48.856613,
				longitude: 2.352222,
				zoom: 8
			}
		},
		location: {
			latitude: 48.864716,
			longitude: 2.349014,
			zoom: 8
		},
		isFavorite: true,
		isPremium: false,
		rating: 4.5,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '6',
		title: 'Second Location Paris',
		type: 'apartment',
		price: 150,
		city: {
			name: 'Paris' as Cities,
			location: {
				latitude: 48.856613,
				longitude: 2.352222,
				zoom: 8
			}
		},
		location: {
			latitude: 48.858844,
			longitude: 2.294351,
			zoom: 8
		},
		isFavorite: false,
		isPremium: true,
		rating: 4.8,
		previewImage: '../../public/img/apartment-01.jpg'
	},
	{
		id: '7',
		title: 'Third Location Paris',
		type: 'apartment',
		price: 110,
		city: {
			name: 'Paris' as Cities,
			location: {
				latitude: 48.856613,
				longitude: 2.352222,
				zoom: 8
			}
		},
		location: {
			latitude: 48.853924,
			longitude: 2.298704,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4.3,
		previewImage: '../../public/img/apartment-02.jpg'
	},
	{
		id: '8',
		title: 'Fourth Location Paris',
		type: 'apartment',
		price: 130,
		city: {
			name: 'Paris' as Cities,
			location: {
				latitude: 48.856613,
				longitude: 2.352222,
				zoom: 8
			}
		},
		location: {
			latitude: 48.861013,
			longitude: 2.333333,
			zoom: 8
		},
		isFavorite: true,
		isPremium: false,
		rating: 4.1,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '9',
		title: 'First Location Cologne',
		type: 'apartment',
		price: 115,
		city: {
			name: 'Cologne' as Cities,
			location: {
				latitude: 50.937531,
				longitude: 6.960279,
				zoom: 8
			}
		},
		location: {
			latitude: 50.93967,
			longitude: 6.963789,
			zoom: 8
		},
		isFavorite: false,
		isPremium: true,
		rating: 4.6,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '10',
		title: 'Second Location Cologne',
		type: 'apartment',
		price: 125,
		city: {
			name: 'Cologne' as Cities,
			location: {
				latitude: 50.937531,
				longitude: 6.960279,
				zoom: 8
			}
		},
		location: {
			latitude: 50.941616,
			longitude: 6.958281,
			zoom: 8
		},
		isFavorite: true,
		isPremium: false,
		rating: 4.4,
		previewImage: '../../public/img/apartment-01.jpg'
	},
	{
		id: '11',
		title: 'Third Location Cologne',
		type: 'apartment',
		price: 118,
		city: {
			name: 'Cologne' as Cities,
			location: {
				latitude: 50.937531,
				longitude: 6.960279,
				zoom: 8
			}
		},
		location: {
			latitude: 50.93807,
			longitude: 6.961601,
			zoom: 8
		},
		isFavorite: false,
		isPremium: true,
		rating: 4.2,
		previewImage: '../../public/img/apartment-02.jpg'
	},
	{
		id: '12',
		title: 'Fourth Location Cologne',
		type: 'apartment',
		price: 130,
		city: {
			name: 'Cologne' as Cities,
			location: {
				latitude: 50.937531,
				longitude: 6.960279,
				zoom: 8
			}
		},
		location: {
			latitude: 50.932276,
			longitude: 6.968924,
			zoom: 8
		},
		isFavorite: true,
		isPremium: false,
		rating: 4.0,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '13',
		title: 'First Location Brussels',
		type: 'apartment',
		price: 100,
		city: {
			name: 'Brussels' as Cities,
			location: {
				latitude: 50.850346,
				longitude: 4.351721,
				zoom: 8
			}
		},
		location: {
			latitude: 50.854885,
			longitude: 4.356078,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4.5,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '14',
		title: 'Second Location Brussels',
		type: 'apartment',
		price: 95,
		city: {
			name: 'Brussels' as Cities,
			location: {
				latitude: 50.850346,
				longitude: 4.351721,
				zoom: 8
			}
		},
		location: {
			latitude: 50.851717,
			longitude: 4.348471,
			zoom: 8
		},
		isFavorite: true,
		isPremium: true,
		rating: 4.7,
		previewImage: '../../public/img/apartment-01.jpg'
	},
	{
		id: '15',
		title: 'Third Location Brussels',
		type: 'apartment',
		price: 105,
		city: {
			name: 'Brussels' as Cities,
			location: {
				latitude: 50.850346,
				longitude: 4.351721,
				zoom: 8
			}
		},
		location: {
			latitude: 50.852124,
			longitude: 4.355392,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4.6,
		previewImage: '../../public/img/apartment-02.jpg'
	},
	{
		id: '16',
		title: 'Fourth Location Brussels',
		type: 'apartment',
		price: 98,
		city: {
			name: 'Brussels' as Cities,
			location: {
				latitude: 50.850346,
				longitude: 4.351721,
				zoom: 8
			}
		},
		location: {
			latitude: 50.853618,
			longitude: 4.357388,
			zoom: 8
		},
		isFavorite: true,
		isPremium: true,
		rating: 4.2,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '17',
		title: 'First Location Hamburg',
		type: 'apartment',
		price: 135,
		city: {
			name: 'Hamburg' as Cities,
			location: {
				latitude: 53.551086,
				longitude: 9.993682,
				zoom: 8
			}
		},
		location: {
			latitude: 53.558735,
			longitude: 9.989728,
			zoom: 8
		},
		isFavorite: false,
		isPremium: true,
		rating: 4.3,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '18',
		title: 'Second Location Hamburg',
		type: 'apartment',
		price: 142,
		city: {
			name: 'Hamburg' as Cities,
			location: {
				latitude: 53.551086,
				longitude: 9.993682,
				zoom: 8
			}
		},
		location: {
			latitude: 53.551403,
			longitude: 9.978913,
			zoom: 8
		},
		isFavorite: true,
		isPremium: false,
		rating: 4.6,
		previewImage: '../../public/img/apartment-01.jpg'
	},
	{
		id: '19',
		title: 'First Location Dusseldorf',
		type: 'apartment',
		price: 160,
		city: {
			name: 'Dusseldorf' as Cities,
			location: {
				latitude: 48.208174,
				longitude: 16.373819,
				zoom: 8
			}
		},
		location: {
			latitude: 48.210033,
			longitude: 16.372473,
			zoom: 8
		},
		isFavorite: true,
		isPremium: true,
		rating: 4.8,
		previewImage: '../../public/img/apartment-03.jpg'
	},
	{
		id: '20',
		title: 'Second Location Dusseldorf',
		type: 'apartment',
		price: 150,
		city: {
			name: 'Dusseldorf' as Cities,
			location: {
				latitude: 48.208174,
				longitude: 16.373819,
				zoom: 8
			}
		},
		location: {
			latitude: 48.206885,
			longitude: 16.363926,
			zoom: 8
		},
		isFavorite: false,
		isPremium: false,
		rating: 4.4,
		previewImage: '../../public/img/apartment-02.jpg'
	}
];
