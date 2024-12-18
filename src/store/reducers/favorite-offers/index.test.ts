import { describe, it, expect } from 'vitest';
import { PayloadAction } from '@reduxjs/toolkit';
import { favoriteOffersReducer, FavoritesOffersState, initialState } from './index';
import { fetchFavoritesOffers, changeFavoriteStatus } from '../../actions';
import { convertOfferInfoToOffer } from '../../../utils/convert-offer-info-into-offer';
import { Offer, OfferRequestStatus } from '../../../types/offer';
import { OfferInfo } from '../../../types/offer-info';
import { ErrorResponse } from '../../types';
import { mockOfferInfo, mockOffer } from '../../../mocks/offers';

describe('favoriteOffersReducer', () => {
	it('should return the initial state', () => {
		expect(favoriteOffersReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle fetchFavoritesOffers.pending', () => {
		const action = { type: fetchFavoritesOffers.pending.type };

		const nextState = favoriteOffersReducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			fetchStatus: { loading: true, error: null }
		});
	});

	it('should handle fetchFavoritesOffers.fulfilled', () => {
		const offers: Offer[] = [mockOffer];
		const action: PayloadAction<Offer[]> = { type: fetchFavoritesOffers.fulfilled.type, payload: offers };

		const nextState = favoriteOffersReducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			favoritesOffers: offers,
			fetchStatus: { loading: false, error: null }
		});
	});

	it('should handle fetchFavoritesOffers.rejected', () => {
		const error: ErrorResponse = { message: 'Error fetching favorites' };
		const action: PayloadAction<ErrorResponse | undefined> = { type: fetchFavoritesOffers.rejected.type, payload: error };

		const nextState = favoriteOffersReducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			fetchStatus: { loading: false, error: 'Error fetching favorites' }
		});
	});

	it('should handle changeFavoriteStatus.pending', () => {
		const action = { type: changeFavoriteStatus.pending.type };

		const nextState = favoriteOffersReducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			postStatus: { loading: true, error: null }
		});
	});

	it('should handle changeFavoriteStatus.fulfilled with Add status', () => {
		const offerInfo: OfferInfo = mockOfferInfo;
		const action: PayloadAction<OfferInfo, string, { arg: { offerId: string; status: OfferRequestStatus } }> = {
			type: changeFavoriteStatus.fulfilled.type,
			payload: offerInfo,
			meta: { arg: { offerId: '1', status: OfferRequestStatus.Add } }
		};

		const nextState = favoriteOffersReducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			favoritesOffers: [convertOfferInfoToOffer(offerInfo)],
			postStatus: { loading: false, error: null }
		});
	});

	it('should handle changeFavoriteStatus.fulfilled with Remove status', () => {
		const initialStateWithOffer: FavoritesOffersState = {
			...initialState,
			favoritesOffers: [mockOffer]
		};
		const offerInfo: OfferInfo = mockOfferInfo;
		const action: PayloadAction<OfferInfo, string, { arg: { offerId: string; status: OfferRequestStatus } }> = {
			type: changeFavoriteStatus.fulfilled.type,
			payload: offerInfo,
			meta: { arg: { offerId: '1', status: OfferRequestStatus.Remove } }
		};

		const nextState = favoriteOffersReducer(initialStateWithOffer, action);

		expect(nextState).toEqual({
			...initialState,
			favoritesOffers: [],
			postStatus: { loading: false, error: null }
		});
	});

	it('should handle changeFavoriteStatus.rejected', () => {
		const error: ErrorResponse = { message: 'Error changing favorite status' };
		const action: PayloadAction<ErrorResponse | undefined> = { type: changeFavoriteStatus.rejected.type, payload: error };

		const nextState = favoriteOffersReducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			postStatus: { loading: false, error: 'Error changing favorite status' }
		});
	});
});
