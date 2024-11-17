import { RootState } from './types';

const selectState = (state: RootState) => state;
const selectCommonState = (state: RootState) => selectState(state).common;

export const selectOffersReducerData = (state: RootState) => selectState(state).offers;
export const selectFavoriteOffersReducerData = (state: RootState) => selectState(state).favoriteOffers;

export const selectCityName = (state: RootState) => selectCommonState(state).city;
export const selectSortVariant = (state: RootState) => selectCommonState(state).sortVariant;
