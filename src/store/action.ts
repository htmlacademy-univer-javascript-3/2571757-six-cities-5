import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../types/cities';
import { SortVariant } from '../types/sort-variants';

const Action = {
	GET_OFFERS: 'GET_OFFERS',
	GET_FAVORITES_OFFERS: 'GET_FAVORITES_OFFERS',
	CHANGE_CITY: 'CHANGE_CITY',
	CHANGE_SORT_VARIANT: 'CHANGE_SORT_VARIANT'
};

export const getOffers = createAction<Cities>(Action.GET_OFFERS);

export const getFavoritesOffers = createAction(Action.GET_FAVORITES_OFFERS);

export const changeCity = createAction<Cities>(Action.CHANGE_CITY);

export const changeSortVariant = createAction<SortVariant>(Action.CHANGE_SORT_VARIANT);
