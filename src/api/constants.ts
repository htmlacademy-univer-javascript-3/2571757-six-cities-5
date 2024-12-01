export enum Paths {
	Offers = '/offers',
	OfferInfo = '/offers/{offerId}',
	NearestOffers = '/offers/{offerId}/nearby',
	FavoritesOffers = '/favorite',
	Login = '/login',
	Logout = '/logout',
	OfferComments = '/comments/{offerId}'
}

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const TIMEOUT = 5000;
