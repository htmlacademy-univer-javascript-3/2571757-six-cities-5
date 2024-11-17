import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../types/cities';
import { SortVariant } from '../types/sort-variants';
import { Paths } from '../api/constants';
import { Offer } from '../types/offer';
import { RootState } from './types';
import api from '../api';

const Action = {
	FETCH_OFFERS: 'FETCH_OFFERS',
	FETCH_FAVORITES_OFFERS: 'FETCH_FAVORITES_OFFERS',
	CHANGE_CITY: 'CHANGE_CITY',
	CHANGE_SORT_VARIANT: 'CHANGE_SORT_VARIANT'
};

export const fetchOffers = createAsyncThunk<Offer[], void, { state: RootState }>(
	Action.FETCH_OFFERS,
	async (_, { rejectWithValue, getState }) => {
		const city = getState().common.city;

		try {
			const response = await api.get<Offer[]>(Paths.FetchOffers);
			const filteredOffers = response.data.filter((offer) => offer.city.name === city);

			return filteredOffers;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchFavoritesOffers = createAsyncThunk<Offer[], void, { state: RootState }>(
	Action.FETCH_OFFERS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<Offer[]>(Paths.FetchFavoritesOffers);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const changeCity = createAction<Cities>(Action.CHANGE_CITY);

export const changeSortVariant = createAction<SortVariant>(Action.CHANGE_SORT_VARIANT);
