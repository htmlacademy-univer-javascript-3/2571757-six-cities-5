import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { fetchFavoritesOffers, changeFavoriteStatus } from './';
import { AppThunkDispatch, RootState } from '../../types';
import { Actions } from '../../../constants/actions';
import { extractActionsTypes } from '../../../utils/extract-actions-types';
import { Offer, OfferRequestStatus } from '../../../types/offer';
import { OfferInfo } from '../../../types/offer-info';
import { mockOffer, mockOfferInfo } from '../../../mocks/offers';
import api from '../../../api';
import { AppActions, ChangeFavoriteStatusFulfilledAction, ChangeFavoriteStatusRejectedAction, FetchFavoritesOffersFulfilledAction, FetchFavoritesOffersRejectedAction } from '../types';
import { Paths } from '../../../api/constants';

describe('Async actions for favorite offers', () => {
	const mockAxiosAdapter = new MockAdapter(api);
	const middleware = [thunk.withExtraArgument(api)];
	const mockStoreCreator = configureMockStore<RootState, AppActions, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
		mockAxiosAdapter.reset();
	});

	describe('fetchFavoritesOffers', () => {
		it('should dispatch "fetchFavoritesOffers.pending" and "fetchFavoritesOffers.fulfilled" on success', async () => {
			const mockResponse: Offer[] = [mockOffer];

			mockAxiosAdapter.onGet(Paths.FavoritesOffers).reply(200, mockResponse);

			await store.dispatch(fetchFavoritesOffers());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_FAVORITES_OFFERS}/pending`,
				`${Actions.FETCH_FAVORITES_OFFERS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_FAVORITES_OFFERS}/fulfilled`
			) as FetchFavoritesOffersFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "fetchFavoritesOffers.pending" and "fetchFavoritesOffers.rejected" on failure', async () => {
			mockAxiosAdapter.onGet(Paths.FavoritesOffers).reply(401, {
				errorType: 'COMMON_ERROR',
				message: 'Access denied.'
			});

			await store.dispatch(fetchFavoritesOffers());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_FAVORITES_OFFERS}/pending`,
				`${Actions.FETCH_FAVORITES_OFFERS}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_FAVORITES_OFFERS}/rejected`
			) as FetchFavoritesOffersRejectedAction;

			expect(rejectedAction?.payload.message).toBe('Access denied.');
		});
	});

	describe('changeFavoriteStatus', () => {
		it('should dispatch "changeFavoriteStatus.pending" and "changeFavoriteStatus.fulfilled" on success add favorite', async () => {
			const mockOfferId = '123';
			const mockStatus: OfferRequestStatus = OfferRequestStatus.Add;
			const mockResponse: OfferInfo = { ...mockOfferInfo, isFavorite: true };

			mockAxiosAdapter.onPost(`${Paths.FavoritesOffers}/${mockOfferId}/${mockStatus}`).reply(201, mockResponse);

			await store.dispatch(changeFavoriteStatus({ offerId: mockOfferId, status: mockStatus }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.CHANGE_FAVORITE_STATUS}/pending`,
				`${Actions.CHANGE_FAVORITE_STATUS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.CHANGE_FAVORITE_STATUS}/fulfilled`
			) as ChangeFavoriteStatusFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "changeFavoriteStatus.pending" and "changeFavoriteStatus.fulfilled" on success remove favorite', async () => {
			const mockOfferId = '123';
			const mockStatus: OfferRequestStatus = OfferRequestStatus.Remove;
			const mockResponse: OfferInfo = { ...mockOfferInfo, isFavorite: false };

			mockAxiosAdapter.onPost(`${Paths.FavoritesOffers}/${mockOfferId}/${mockStatus}`).reply(200, mockResponse);

			await store.dispatch(changeFavoriteStatus({ offerId: mockOfferId, status: mockStatus }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.CHANGE_FAVORITE_STATUS}/pending`,
				`${Actions.CHANGE_FAVORITE_STATUS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.CHANGE_FAVORITE_STATUS}/fulfilled`
			) as ChangeFavoriteStatusFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});


		it('should dispatch "changeFavoriteStatus.pending" and "changeFavoriteStatus.rejected" on failure', async () => {
			const mockOfferId = '123';
			const mockStatus = 2 as OfferRequestStatus;

			mockAxiosAdapter.onPost(`${Paths.FavoritesOffers}/${mockOfferId}/${mockStatus}`).reply(400, {
				'errorType': 'COMMON_ERROR',
				'message': 'Wrong status to add offer in favorite: 2.'
			});

			await store.dispatch(changeFavoriteStatus({ offerId: mockOfferId, status: mockStatus }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.CHANGE_FAVORITE_STATUS}/pending`,
				`${Actions.CHANGE_FAVORITE_STATUS}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.CHANGE_FAVORITE_STATUS}/rejected`
			) as ChangeFavoriteStatusRejectedAction;

			expect(rejectedAction?.payload.message).toBe('Wrong status to add offer in favorite: 2.');
		});
	});
});
