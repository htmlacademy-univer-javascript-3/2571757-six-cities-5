import { Comment } from '../../types/comment';
import { convertDate } from '../../utils/convert-date';
import { calculateRatingWidth } from '../../utils/calculate-rating-width';

type Props = {
	comment: Comment;
};

export const Review = ({ comment }: Props) => {
	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
				</div>
				<span className="reviews__user-name">{comment.user.name}</span>
			</div>
			<div className="reviews__info">
				<div className="reviews__rating rating">
					<div className="reviews__stars rating__stars">
						<span style={{ width: calculateRatingWidth(comment.rating) }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<p className="reviews__text">
					{comment.comment}
				</p>
				<time className="reviews__time">{convertDate(comment.date)}</time>
			</div>
		</li>
	);
};
