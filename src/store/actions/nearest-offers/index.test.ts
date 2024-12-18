import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { fetchNearestOffers } from './';
import { AppThunkDispatch, RootState } from '../../types';
import { Actions } from '../../../constants/actions';
import { extractActionsTypes } from '../../../utils/extract-actions-types';
import { Offer } from '../../../types/offer';
import { mockOffer } from '../../../mocks/offers';
import api from '../../../api';
import { AppActions, FetchNearestOffersFulfilledAction, FetchNearestOffersRejectedAction } from '../types';
import { Paths } from '../../../api/constants';

describe('Async action for fetching nearest offers', () => {
	const mockAxiosAdapter = new MockAdapter(api);
	const middleware = [thunk.withExtraArgument(api)];
	const mockStoreCreator = configureMockStore<RootState, AppActions, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
		mockAxiosAdapter.reset();
	});

	describe('fetchNearestOffers', () => {
		it('should dispatch "fetchNearestOffers.pending" and "fetchNearestOffers.fulfilled" on success', async () => {
			const mockOfferId = '123';
			const mockResponse: Offer[] = [mockOffer];

			mockAxiosAdapter.onGet(Paths.NearestOffers.replace('{offerId}', mockOfferId)).reply(200, mockResponse);

			await store.dispatch(fetchNearestOffers({ offerId: mockOfferId }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_NEAREST_OFFERS}/pending`,
				`${Actions.FETCH_NEAREST_OFFERS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_NEAREST_OFFERS}/fulfilled`
			) as FetchNearestOffersFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "fetchNearestOffers.pending" and "fetchNearestOffers.rejected" on failure', async () => {
			const mockOfferId = '123';

			mockAxiosAdapter.onGet(Paths.NearestOffers.replace('{offerId}', mockOfferId)).reply(404, {
				errorType: 'COMMON_ERROR',
				message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
			});

			await store.dispatch(fetchNearestOffers({ offerId: mockOfferId }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_NEAREST_OFFERS}/pending`,
				`${Actions.FETCH_NEAREST_OFFERS}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_NEAREST_OFFERS}/rejected`
			) as FetchNearestOffersRejectedAction;

			expect(rejectedAction?.payload.message).toBe('Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.');
		});
	});
});
