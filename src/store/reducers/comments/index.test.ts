import { commentsReducer, initialState } from './index';
import { fetchOfferComments, postOfferComment } from '../../action';
import type { Comment } from '../../../types/comment';
import { ErrorResponse } from '../../types';

describe('commentsReducer', () => {
	describe('initial state', () => {
		it('should return the initial state', () => {
			const action = { type: 'unknown' };

			const result = commentsReducer(undefined, action);

			expect(result).toEqual(initialState);
		});
	});

	describe('fetchOfferComments', () => {
		it('should handle fetchOfferComments.pending', () => {
			const action = { type: fetchOfferComments.pending.type };

			const result = commentsReducer(initialState, action);

			expect(result).toEqual({
				...initialState,
				fetchStatus: {
					loading: true,
					error: null
				}
			});
		});

		it('should handle fetchOfferComments.fulfilled', () => {
			const comments: Comment[] = [
				{
					id: '1',
					date: '2023-10-01T12:00:00Z',
					user: {
						name: 'Author 1',
						avatarUrl: 'http://example.com/avatar1.jpg',
						isPro: true
					},
					comment: 'Comment 1',
					rating: 4
				},
				{
					id: '2',
					date: '2023-10-02T12:00:00Z',
					user: {
						name: 'Author 2',
						avatarUrl: 'http://example.com/avatar2.jpg',
						isPro: false
					},
					comment: 'Comment 2',
					rating: 5
				}
			];
			const action = { type: fetchOfferComments.fulfilled.type, payload: comments };

			const result = commentsReducer(initialState, action);

			expect(result).toEqual({
				...initialState,
				fetchStatus: {
					loading: false,
					error: null
				},
				comments: comments
			});
		});

		it('should handle fetchOfferComments.rejected', () => {
			const error: ErrorResponse = { message: 'Error fetching comments' };
			const action = { type: fetchOfferComments.rejected.type, payload: error };

			const result = commentsReducer(initialState, action);

			expect(result).toEqual({
				...initialState,
				fetchStatus: {
					loading: false,
					error: error.message
				}
			});
		});
	});

	describe('postOfferComment', () => {
		it('should handle postOfferComment.pending', () => {
			const action = { type: postOfferComment.pending.type };

			const result = commentsReducer(initialState, action);

			expect(result).toEqual({
				...initialState,
				postStatus: {
					loading: true,
					error: null
				}
			});
		});

		it('should handle postOfferComment.fulfilled', () => {
			const newComment: Comment = {
				id: '3',
				date: '2023-10-03T12:00:00Z',
				user: {
					name: 'New Author',
					avatarUrl: 'http://example.com/newavatar.jpg',
					isPro: true
				},
				comment: 'New Comment',
				rating: 3
			};
			const action = { type: postOfferComment.fulfilled.type, payload: newComment };

			const result = commentsReducer(initialState, action);

			expect(result).toEqual({
				...initialState,
				postStatus: {
					loading: false,
					error: null
				},
				comments: [newComment]
			});
		});

		it('should handle postOfferComment.rejected', () => {
			const error: ErrorResponse = { message: 'Error posting comment' };
			const action = { type: postOfferComment.rejected.type, payload: error };

			const result = commentsReducer(initialState, action);

			expect(result).toEqual({
				...initialState,
				postStatus: {
					loading: false,
					error: error.message
				}
			});
		});
	});
});
