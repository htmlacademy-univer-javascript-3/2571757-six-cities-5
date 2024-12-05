import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { fetchOfferComments, postOfferComment } from './';
import { AppThunkDispatch, RootState } from '../../types';
import { Actions } from '../../../constants/actions';
import { extractActionsTypes } from '../../../utils/extract-actions-types';
import { Comment, CommentFormState } from '../../../types/comment';
import { Paths } from '../../../api/constants';
import { AppActions, FetchOfferCommentsFulfilledAction, FetchOfferCommentsRejectedAction, PostOfferCommentFulfilledAction, PostOfferCommentRejectedAction } from '../types';
import { mockComment } from '../../../mocks/comments';
import api from '../../../api';

describe('Async actions for offer comments', () => {
	const mockAxiosAdapter = new MockAdapter(api);
	const middleware = [thunk.withExtraArgument(api)];
	const mockStoreCreator = configureMockStore<RootState, AppActions, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
		mockAxiosAdapter.reset();
	});

	describe('fetchOfferComments', () => {
		it('should dispatch "fetchOfferComments.pending" and "fetchOfferComments.fulfilled" on success', async () => {
			const mockOfferId = '123';
			const mockResponse: Comment[] = [mockComment];

			mockAxiosAdapter.onGet(Paths.OfferComments.replace('{offerId}', mockOfferId)).reply(200, mockResponse);

			await store.dispatch(fetchOfferComments({ offerId: mockOfferId }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_OFFER_COMMENTS}/pending`,
				`${Actions.FETCH_OFFER_COMMENTS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_OFFER_COMMENTS}/fulfilled`
			) as FetchOfferCommentsFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "fetchOfferComments.pending" and "fetchOfferComments.rejected" on failure', async () => {
			const mockOfferId = '123';
			mockAxiosAdapter.onGet(Paths.OfferComments.replace('{offerId}', mockOfferId)).reply(401, {
				errorType: 'COMMON_ERROR',
				message: 'Access deny.'
			});

			await store.dispatch(fetchOfferComments({ offerId: mockOfferId }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.FETCH_OFFER_COMMENTS}/pending`,
				`${Actions.FETCH_OFFER_COMMENTS}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.FETCH_OFFER_COMMENTS}/rejected`
			) as FetchOfferCommentsRejectedAction;

			expect(rejectedAction?.payload.message).toBe('Access deny.');
		});
	});

	describe('postOfferComment', () => {
		it('should dispatch "postOfferComment.pending" and "postOfferComment.fulfilled" on success', async () => {
			const mockOfferId = '123';
			const mockCommentData: CommentFormState = { comment: 'Nice offer!', rating: 5 };
			const mockResponse: Comment = mockComment;

			mockAxiosAdapter.onPost(Paths.OfferComments.replace('{offerId}', mockOfferId)).reply(200, mockResponse);

			await store.dispatch(postOfferComment({ offerId: mockOfferId, ...mockCommentData }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.POST_OFFER_COMMENT}/pending`,
				`${Actions.POST_OFFER_COMMENT}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.POST_OFFER_COMMENT}/fulfilled`
			) as PostOfferCommentFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "postOfferComment.pending" and "postOfferComment.rejected" on failure', async () => {
			const mockOfferId = '123';
			const mockCommentData: CommentFormState = { comment: 'Nice offer!', rating: 5 };

			mockAxiosAdapter.onPost(Paths.OfferComments.replace('{offerId}', mockOfferId)).reply(400, {
				errorType: 'VALIDATION_ERROR',
				message: 'Validation error: /six-cities/comments/3254b559-0a4f-4c20-a514-0dc38173ea09',
				details: [
					{
						property: 'rating',
						value: 'a',
						messages: [
							'rating must be a number conforming to the specified constraints'
						]
					}
				]
			});

			await store.dispatch(postOfferComment({ offerId: mockOfferId, ...mockCommentData }));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.POST_OFFER_COMMENT}/pending`,
				`${Actions.POST_OFFER_COMMENT}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.POST_OFFER_COMMENT}/rejected`
			) as PostOfferCommentRejectedAction;

			expect(rejectedAction?.payload.message).toBe('Validation error: /six-cities/comments/3254b559-0a4f-4c20-a514-0dc38173ea09');
		});
	});
});
