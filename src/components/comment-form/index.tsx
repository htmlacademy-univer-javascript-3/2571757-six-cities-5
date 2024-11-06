import { useState, ChangeEvent, FormEvent, Fragment } from 'react';
import { getRatingTitle } from './utils';
import { CommentFormState } from './types';

const MIN_COMMENT_MESSAGE_LENGTH = 50;
const RATING_VARIANTS = [5, 4, 3, 2, 1];

export const CommentForm = () => {
	const [formData, setFormData] = useState<CommentFormState>({
		rating: '',
		review: ''
	});

	const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = evt.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		// eslint-disable-next-line no-console
		console.log('Submitted:', formData);
	};

	const isSubmitDisabled = !formData.rating.length || formData.review.length < MIN_COMMENT_MESSAGE_LENGTH;

	return (
		<form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
			<label className="reviews__label form__label" htmlFor="review">Your review</label>
			<div className="reviews__rating-form form__rating">
				{RATING_VARIANTS.map((star) => (
					<Fragment key={star}>
						<input
							className="form__rating-input visually-hidden"
							name="rating"
							value={star.toString()}
							id={`${star}-stars`}
							type="radio"
							onChange={handleFieldChange}
						/>
						<label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title={getRatingTitle(star)}>
							<svg className="form__star-image" width="37" height="33">
								<use xlinkHref="#icon-star"></use>
							</svg>
						</label>
					</Fragment>
				))}
			</div>
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				value={formData.review}
				onChange={handleFieldChange}
				placeholder="Tell how was your stay, what you like and what can be improved"
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set <span className="reviews__star">rating</span> and describe
					your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_MESSAGE_LENGTH}</b>.
				</p>
				<button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
			</div>
		</form>
	);
};
