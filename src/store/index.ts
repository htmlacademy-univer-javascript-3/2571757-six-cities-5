import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commonReducer as common } from './reducers/common';
import { offersReducer as offers } from './reducers/offers';
import { nearestOffersReducer as nearestOffers } from './reducers/nearest-offers';
import { offerInfoReducer as offerInfo } from './reducers/offer-info';
import { favoriteOffersReducer as favoriteOffers } from './reducers/favorite-offers';
import { authReducer as auth } from './reducers/auth';
import { commentsReducer as comments } from './reducers/comments';
import api from '../api';

const reducer = combineReducers({
	offerInfo,
	nearestOffers,
	offers,
	common,
	favoriteOffers,
	comments,
	auth
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
