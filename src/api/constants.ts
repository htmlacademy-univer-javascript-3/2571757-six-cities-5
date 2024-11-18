export enum Paths {
	FetchOffers = '/offers',
	FetchOfferInfo = '/offers/{offerId}',
	FetchNearestOffers = '/offers/{offerId}/nearby',
	FetchFavoritesOffers = '/favorite',
	Login = '/login',
	Logout = '/logout',
	OfferComments = '/comments/{offerId}'
}

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const TIMEOUT = 5000;
