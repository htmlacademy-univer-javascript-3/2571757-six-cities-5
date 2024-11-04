import { commentsMock } from '../../mocks/comments';
import { CommentForm } from '../comment-form';
import { ReviewList } from '../review-list';

export const FeedbackBlock = () => {
	const reviewsAmount = commentsMock.length;

	return (
		<section className="offer__reviews reviews">
			<h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span>
			</h2>
			<ReviewList comments={commentsMock} />
			<CommentForm />
		</section>
	);
};
