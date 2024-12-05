import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { fetchOfferInfo } from './';
import { AppThunkDispatch, RootState } from '../../types';
import { Actions } from '../../../constants/actions';
import { extractActionsTypes } from '../../../utils/extract-actions-types';
import { OfferInfo } from '../../../types/offer-info';
import { AppActions, FetchOfferInfoFulfilledAction, FetchOfferInfoRejectedAction } from '../types';
import api from '../../../api';
import { Paths } from '../../../api/constants';
import { mockOfferInfo } from '../../../mocks/offers';

describe('Async action for fetching offer info', () => {
	const mockAxiosAdapter = new MockAdapter(api);
	const middleware = [thunk.withExtraArgument(api)];
	const mockStoreCreator = configureMockStore<RootState, AppActions, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
		mockAxiosAdapter.reset();
	});

	describe('fetchOfferInfo', () => {
		it('should dispatch "fetchOfferInfo.pending" and "fetchOfferInfo.fulfilled" on success', async () => {
			const mockOfferId = '123';
			const mockResponse: OfferInfo = mockOfferInfo;

			mockAxiosAdapter.onGet(Paths.OfferInfo.replace('{offerId}', mockOfferId)).reply(200, mockResponse);

			await store.dispatch(fetchOfferInfo({ offerId: mockOfferId }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_OFFER}/pending`,
				`${Actions.FETCH_OFFER}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_OFFER}/fulfilled`
			) as FetchOfferInfoFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "fetchOfferInfo.pending" and "fetchOfferInfo.rejected" on failure', async () => {
			const mockOfferId = '123';

			mockAxiosAdapter.onGet(Paths.OfferInfo.replace('{offerId}', mockOfferId)).reply(404, {
				errorType: 'COMMON_ERROR',
				message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
			});

			await store.dispatch(fetchOfferInfo({ offerId: mockOfferId }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_OFFER}/pending`,
				`${Actions.FETCH_OFFER}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_OFFER}/rejected`
			) as FetchOfferInfoRejectedAction;

			expect(rejectedAction?.payload.message).toBe('Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.');
		});
	});
});
