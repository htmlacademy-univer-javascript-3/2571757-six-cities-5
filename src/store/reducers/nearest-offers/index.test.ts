import { nearestOffersReducer, initialState } from './index';
import { fetchNearestOffers, changeFavoriteStatus } from '../../action';
import { Offer } from '../../../types/offer';
import { ErrorResponse } from '../../types';
import { OfferInfo } from '../../../types/offer-info';
import { mockOffer, mockOfferInfo } from '../../../mocks/offers';

describe('nearestOffersReducer', () => {
	it('should return the initial state', () => {
		const action = { type: '' };

		const result = nearestOffersReducer(undefined, action);

		expect(result).toEqual(initialState);
	});

	it('should handle fetchNearestOffers.pending', () => {
		const action = { type: fetchNearestOffers.pending.type };

		const result = nearestOffersReducer(initialState, action);

		expect(result).toEqual({
			...initialState,
			loading: true,
			error: null
		});
	});

	it('should handle fetchNearestOffers.fulfilled', () => {
		const offers: Offer[] = [
			mockOffer
		];
		const action = { type: fetchNearestOffers.fulfilled.type, payload: offers };

		const result = nearestOffersReducer(initialState, action);

		expect(result).toEqual({
			...initialState,
			nearestOffers: offers,
			loading: false,
			error: null
		});
	});

	it('should handle fetchNearestOffers.rejected', () => {
		const error: ErrorResponse = { message: 'Error fetching offers' };
		const action = { type: fetchNearestOffers.rejected.type, payload: error };

		const result = nearestOffersReducer(initialState, action);

		expect(result).toEqual({
			...initialState,
			loading: false,
			error: error.message
		});
	});

	it('should handle changeFavoriteStatus.fulfilled', () => {
		const initialOffers: Offer[] = [
			mockOffer
		];
		const updatedOffer: OfferInfo = { ...mockOfferInfo, isFavorite: true };
		const action = { type: changeFavoriteStatus.fulfilled.type, payload: updatedOffer };
		const state = { ...initialState, nearestOffers: initialOffers };

		const result = nearestOffersReducer(state, action);

		expect(result).toEqual({
			...state,
			nearestOffers: [
				{ ...mockOffer, isFavorite: true }
			]
		});
	});
});
