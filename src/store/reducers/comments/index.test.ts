import { commentsReducer, initialState } from './index';
import { fetchOfferComments, postOfferComment } from '../../action';
import type { Comment } from '../../../types/comment';
import { ErrorResponse } from '../../types';
import { mockComment } from '../../../mocks/comments';

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
					...mockComment,
					id: '1'
				},
				{
					...mockComment,
					id: '2'
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
			const newComment: Comment = mockComment;
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
