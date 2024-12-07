import { offerInfoReducer, initialState, OfferInfoState } from './index';
import { fetchOfferInfo, changeFavoriteStatus } from '../../actions';
import { OfferInfo } from '../../../types/offer-info';
import { ErrorResponse } from '../../types';
import { mockOfferInfo } from '../../../mocks/offers';

describe('offerInfoReducer', () => {
	describe('fetchOfferInfo', () => {
		it('should handle fetchOfferInfo.pending', () => {
			const action = { type: fetchOfferInfo.pending.type };
			const state = offerInfoReducer(initialState, action);

			expect(state.loading).toBe(true);
			expect(state.error).toBe(null);
		});

		it('should handle fetchOfferInfo.fulfilled', () => {
			const offerInfo: OfferInfo = mockOfferInfo;
			const action = { type: fetchOfferInfo.fulfilled.type, payload: offerInfo };
			const state = offerInfoReducer(initialState, action);

			expect(state.offerInfo).toBe(offerInfo);
			expect(state.loading).toBe(false);
			expect(state.error).toBe(null);
		});

		it('should handle fetchOfferInfo.rejected', () => {
			const error: ErrorResponse = {
				message: 'Error fetching offer info'
			};
			const action = { type: fetchOfferInfo.rejected.type, payload: error };
			const state = offerInfoReducer(initialState, action);

			expect(state.loading).toBe(false);
			expect(state.error).toBe(error.message);
		});
	});

	describe('changeFavoriteStatus', () => {
		it('should handle changeFavoriteStatus.fulfilled when the current offer is updated', () => {
			const currentOfferInfo: OfferInfo = mockOfferInfo;
			const updatedOfferInfo: OfferInfo = { ...currentOfferInfo, title: 'Updated Offer' };
			const initialStateWithOffer: OfferInfoState = {
				...initialState,
				offerInfo: currentOfferInfo
			};
			const action = { type: changeFavoriteStatus.fulfilled.type, payload: updatedOfferInfo };
			const state = offerInfoReducer(initialStateWithOffer, action);

			expect(state.offerInfo).toBe(updatedOfferInfo);
		});

		it('should handle changeFavoriteStatus.fulfilled when the current offer is not updated', () => {
			const currentOfferInfo: OfferInfo = mockOfferInfo;
			const updatedOfferInfo: OfferInfo = mockOfferInfo;
			const initialStateWithOffer: OfferInfoState = {
				...initialState,
				offerInfo: currentOfferInfo
			};
			const action = { type: changeFavoriteStatus.fulfilled.type, payload: updatedOfferInfo };
			const state = offerInfoReducer(initialStateWithOffer, action);

			expect(state.offerInfo).toBe(currentOfferInfo);
		});
	});
});
