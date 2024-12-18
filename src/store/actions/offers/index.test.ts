import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { fetchOffers } from './';
import { AppThunkDispatch, RootState } from '../../types';
import { Actions } from '../../../constants/actions';
import { extractActionsTypes } from '../../../utils/extract-actions-types';
import { Offer } from '../../../types/offer';
import { AppActions, FetchOffersFulfilledAction } from '../types';
import { Cities } from '../../../types/cities';
import { Paths } from '../../../api/constants';
import { mockOffer } from '../../../mocks/offers';
import api from '../../../api';

describe('Async action for fetching offers', () => {
	const mockAxiosAdapter = new MockAdapter(api);
	const middleware = [thunk.withExtraArgument(api)];
	const mockStoreCreator = configureMockStore<RootState, AppActions, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({
			common: {
				city: Cities.Amsterdam
			}
		});
		mockAxiosAdapter.reset();
	});

	describe('fetchOffers', () => {
		it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" on success', async () => {
			const mockResponse: Offer[] = [mockOffer];

			mockAxiosAdapter.onGet(Paths.Offers).reply(200, mockResponse);

			await store.dispatch(fetchOffers());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_OFFERS}/pending`,
				`${Actions.FETCH_OFFERS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_OFFERS}/fulfilled`
			) as FetchOffersFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse.filter((offer) => offer.city.name === Cities.Amsterdam));
		});
	});
});
