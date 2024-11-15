import { RootState } from './types';

const selectState = (state: RootState) => state;

export const selectCityName = (state: RootState) => selectState(state).city;
export const selectOffers = (state: RootState) => selectState(state).offers;
export const selectFavoriteOffers = (state: RootState) => selectState(state).favoritesOffers;
export const selectSortVariant = (state: RootState) => selectState(state).sortVariant;
