// src/store/actions/types.ts

import { UserData } from '../../types/user';
import { ErrorResponse } from '../types';
import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import { OfferInfo } from '../../types/offer-info';

export const Actions = {
	CHECK_AUTH_STATUS: 'CHECK_AUTH_STATUS',
	AUTHORIZE: 'AUTHORIZE',
	LOGOUT: 'LOGOUT',
	FETCH_OFFER_COMMENTS: 'FETCH_OFFER_COMMENTS',
	POST_OFFER_COMMENT: 'POST_OFFER_COMMENT'
	// Другие действия
} as const;

export type ActionsType = typeof Actions[keyof typeof Actions];

// CheckAuthStatus actions
export type CheckAuthStatusPendingAction = {
	type: `${ActionsType}/pending`;
};

export type CheckAuthStatusFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: UserData;
};

export type CheckAuthStatusRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

// Authorize actions
export type AuthorizePendingAction = {
	type: `${ActionsType}/pending`;
};

export type AuthorizeFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: UserData;
};

export type AuthorizeRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

// Logout actions
export type LogoutPendingAction = {
	type: `${ActionsType}/pending`;
};

export type LogoutFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
};

export type LogoutRejectedAction = {
	type: `${ActionsType}/rejected`;
};

export type FetchOfferCommentsPendingAction = {
	type: `${ActionsType}/pending`;
};

export type FetchOfferCommentsFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: Comment[];
};

export type FetchOfferCommentsRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type PostOfferCommentPendingAction = {
	type: `${ActionsType}/pending`;
};

export type PostOfferCommentFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: Comment;
};

export type PostOfferCommentRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type FetchFavoritesOffersPendingAction = {
	type: `${ActionsType}/pending`;
};

export type FetchFavoritesOffersFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: Offer[];
};

export type FetchFavoritesOffersRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type ChangeFavoriteStatusPendingAction = {
	type: `${ActionsType}/pending`;
};

export type ChangeFavoriteStatusFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: OfferInfo;
};

export type ChangeFavoriteStatusRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type FetchNearestOffersPendingAction = {
	type: `${ActionsType}/pending`;
};

export type FetchNearestOffersFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: Offer[];
};

export type FetchNearestOffersRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type FetchOfferInfoPendingAction = {
	type: `${ActionsType}/pending`;
};

export type FetchOfferInfoFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: OfferInfo;
};

export type FetchOfferInfoRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type FetchOffersPendingAction = {
	type: `${ActionsType}/pending`;
};

export type FetchOffersFulfilledAction = {
	type: `${ActionsType}/fulfilled`;
	payload: Offer[];
};

export type FetchOffersRejectedAction = {
	type: `${ActionsType}/rejected`;
	payload: ErrorResponse;
};

export type AppActions =
	| CheckAuthStatusPendingAction
	| CheckAuthStatusFulfilledAction
	| CheckAuthStatusRejectedAction
	| AuthorizePendingAction
	| AuthorizeFulfilledAction
	| AuthorizeRejectedAction
	| LogoutPendingAction
	| LogoutFulfilledAction
	| LogoutRejectedAction
	| FetchOfferCommentsPendingAction
	| FetchOfferCommentsFulfilledAction
	| FetchOfferCommentsRejectedAction
	| PostOfferCommentPendingAction
	| PostOfferCommentFulfilledAction
	| PostOfferCommentRejectedAction
	| FetchFavoritesOffersPendingAction
	| FetchFavoritesOffersFulfilledAction
	| FetchFavoritesOffersRejectedAction
	| ChangeFavoriteStatusPendingAction
	| ChangeFavoriteStatusFulfilledAction
	| ChangeFavoriteStatusRejectedAction
	| FetchNearestOffersPendingAction
	| FetchNearestOffersFulfilledAction
	| FetchNearestOffersRejectedAction
	| FetchOfferInfoPendingAction
	| FetchOfferInfoFulfilledAction
	| FetchOfferInfoRejectedAction
	| FetchOffersPendingAction
	| FetchOffersFulfilledAction
	| FetchOffersRejectedAction;
