import { createReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Comment } from '../../types/comment';
import { fetchOfferComments, postOfferComment } from '../action';

type CommentsState = {
	comments: Comment[];
	loading: boolean;
	error: string | null;
	lastAddedComment: Comment | null;
};

const initialState: CommentsState = {
	comments: [],
	loading: false,
	error: null,
	lastAddedComment: null
};

export const commentsReducer = createReducer(
	initialState,
	(builder) => {
		builder
			// fetchOfferComments
			.addCase(fetchOfferComments.pending, (state) => {
				state.loading = true;
				state.comments = [];
			})
			.addCase(fetchOfferComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
				state.comments = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchOfferComments.rejected, (state, action) => {
				state.comments = [];
				state.loading = false;
				state.error = action.error.message || 'Something went wrong';
			})
			// postOfferComment
			.addCase(postOfferComment.pending, (state) => {
				state.loading = true;
			})
			.addCase(postOfferComment.fulfilled, (state, action: PayloadAction<Comment>) => {
				state.comments = [...state.comments, action.payload];
				state.lastAddedComment = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(postOfferComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Something went wrong';
			});
	}
);

export default commentsReducer;
