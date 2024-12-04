import { offersReducer } from './index';
import { fetchOffers, changeFavoriteStatus } from '../../action';
import { Offer } from '../../../types/offer';
import { ErrorResponse } from '../../types';
import { OfferInfo } from '../../../types/offer-info';
import { mockOffer, mockOfferInfo } from '../../../mocks/offers';

describe('offersSlice', () => {
	const initialState = {
		offers: [],
		loading: false,
		error: null
	};

	describe('fetchOffers', () => {
		it('should handle fetchOffers.pending', () => {
			const action = { type: fetchOffers.pending.type };
			const state = offersReducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: true,
				error: null
			});
		});

		it('should handle fetchOffers.fulfilled', () => {
			const offers: Offer[] = [mockOffer];
			const action = { type: fetchOffers.fulfilled.type, payload: offers };
			const state = offersReducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				offers,
				loading: false,
				error: null
			});
		});

		it('should handle fetchOffers.rejected', () => {
			const error: ErrorResponse = { message: 'Error fetching offers' };
			const action = { type: fetchOffers.rejected.type, payload: error };
			const state = offersReducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: error.message
			});
		});
	});

	describe('changeFavoriteStatus', () => {
		it('should handle changeFavoriteStatus.fulfilled', () => {
			const initialStateWithOffers = {
				...initialState,
				offers: [mockOffer]
			};
			const updatedOffer: OfferInfo = { ...mockOfferInfo, isFavorite: true };
			const action = { type: changeFavoriteStatus.fulfilled.type, payload: updatedOffer };
			const state = offersReducer(initialStateWithOffers, action);

			expect(state).toEqual({
				...initialStateWithOffers,
				offers: [{ ...mockOffer, isFavorite: true }]
			});
		});
	});
});
