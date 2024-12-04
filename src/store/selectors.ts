import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './types';

const selectState = (state: RootState) => state;
const selectCommonState = (state: RootState) => selectState(state).common;

export const selectOffersReducerData = (state: RootState) => selectState(state).offers;
export const selectOfferInfoReducerData = (state: RootState) => selectState(state).offerInfo;
export const selectNearestOffersReducerData = (state: RootState) => selectState(state).nearestOffers;
export const selectFavoriteOffersReducerData = (state: RootState) => selectState(state).favoriteOffers;
export const selectAuthReducerData = (state: RootState) => selectState(state).auth;
export const selectCommentsReducerData = (state: RootState) => selectState(state).comments;

export const selectCityName = createSelector(selectCommonState, (state) => state.city);
export const selectSortVariant = createSelector(selectCommonState, (state) => state.sortVariant);
