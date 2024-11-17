import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './reducers/common';
import offersReducer from './reducers/offers';
import favoriteOffersReducer from './reducers/favorite-offers';
import authReducer from './reducers/auth';
import api from '../api';

const reducer = combineReducers({
	offers: offersReducer,
	common: commonReducer,
	favoriteOffers: favoriteOffersReducer,
	auth: authReducer
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api
			}
		})
});
