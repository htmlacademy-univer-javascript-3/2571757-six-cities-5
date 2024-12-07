import { createAsyncThunk } from '@reduxjs/toolkit';
import { Actions } from '../../../constants/actions';
import { ErrorResponse, ThunkConfig } from '../../types';
import { Paths } from '../../../api/constants';
import { sortCommentsByDate } from '../../../utils/sort-by-date';
import { handleApiError } from '../../utils/handle-api-error';
import { Comment, CommentFormState } from '../../../types/comment';
import api from '../../../api';

export const fetchOfferComments = createAsyncThunk<Comment[], { offerId: string }, ThunkConfig<ErrorResponse>>(
	Actions.FETCH_OFFER_COMMENTS,
	async ({ offerId }, { rejectWithValue }) => {
		try {
			const response = await api.get<Comment[]>(Paths.OfferComments.replace('{offerId}', offerId));

			return sortCommentsByDate(response.data);
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);

export const postOfferComment = createAsyncThunk<Comment, { offerId: string } & CommentFormState, ThunkConfig<ErrorResponse>>(
	Actions.POST_OFFER_COMMENT,
	async ({ offerId, comment, rating }, { rejectWithValue }) => {
		try {
			const response = await api.post<Comment>(Paths.OfferComments.replace('{offerId}', offerId), { comment, rating });

			return response.data;
		} catch (error) {
			return rejectWithValue(handleApiError(error));
		}
	}
);
