import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './reducers/common';
import offersReducer from './reducers/offers';
import nearestOffersReducer from './reducers/nearest-offers';
import offerInfoReducer from './reducers/offer-info';
import favoriteOffersReducer from './reducers/favorite-offers';
import authReducer from './reducers/auth';
import commentsReducer from './reducers/comments';
import api from '../api';

const reducer = combineReducers({
	offerInfo: offerInfoReducer,
	nearestOffers: nearestOffersReducer,
	offers: offersReducer,
	common: commonReducer,
	favoriteOffers: favoriteOffersReducer,
	comments: commentsReducer,
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
