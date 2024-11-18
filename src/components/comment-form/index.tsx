import { useReducer, useCallback, useMemo, Fragment } from 'react';
import { getRatingTitle } from './utils';
import { useActions } from '../../store/hooks';
import { CommentFormState } from '../../types/comment';

const MIN_COMMENT_MESSAGE_LENGTH = 50;
const RATING_VARIANTS = [5, 4, 3, 2, 1];

type Props = {
	offerId: string;
};

type FormState = Partial<CommentFormState>;

const initialFormData: FormState = {
	rating: undefined,
	comment: ''
};

type FormAction =
	| { type: 'UPDATE_FIELD'; field: keyof FormState; value: string | number }
	| { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction): FormState => {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return { ...state, [action.field]: action.value };
		case 'RESET':
			return initialFormData;
		default:
			return state;
	}
};

export const CommentForm = ({ offerId }: Props) => {
	const { postOfferComment } = useActions();
	const [formData, dispatch] = useReducer(formReducer, initialFormData);

	const handleFieldChange = useCallback((evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = evt.target;
		dispatch({ type: 'UPDATE_FIELD', field: name as keyof FormState, value: name === 'rating' ? Number(value) : value });
	}, []);

	const handleSubmit = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (formData.comment && typeof formData.rating === 'number') {
			postOfferComment({ offerId, comment: formData.comment, rating: formData.rating });
			dispatch({ type: 'RESET' });
		}
	}, [formData, postOfferComment, offerId]);

	const isSubmitDisabled = useMemo(() => {
		return !(typeof formData.rating === 'number' && formData.comment && formData.comment.length >= MIN_COMMENT_MESSAGE_LENGTH);
	}, [formData]);

	return (
		<form className="reviews__form form" onSubmit={handleSubmit}>
			<label className="reviews__label form__label" htmlFor="review">Your review</label>
			<div className="reviews__rating-form form__rating">
				{RATING_VARIANTS.map((star) => (
					<Fragment key={star}>
						<input
							className="form__rating-input visually-hidden"
							name="rating"
							value={star}
							id={`${star}-stars`}
							type="radio"
							checked={formData.rating === star}
							onChange={handleFieldChange}
						/>
						<label
							htmlFor={`${star}-stars`}
							className="reviews__rating-label form__rating-label"
							title={getRatingTitle(star)}
						>
							<svg className="form__star-image" width="37" height="33">
								<use xlinkHref="#icon-star"></use>
							</svg>
						</label>
					</Fragment>
				))}
			</div>
			<textarea
				className="reviews__textarea form__textarea"
				id="comment"
				name="comment"
				value={formData.comment}
				onChange={handleFieldChange}
				placeholder="Tell how was your stay, what you like and what can be improved"
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set <span className="reviews__star">rating</span> and describe
					your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_MESSAGE_LENGTH}</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={isSubmitDisabled}
				>
					Submit
				</button>
			</div>
		</form>
	);
};
