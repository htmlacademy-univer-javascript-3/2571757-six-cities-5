import type { Comment } from '../../types/comment';
import { Review } from '../review';

const MAX_REVIEWS_AMOUNT = 10;

type Props = {
	comments: Comment[];
};

export const ReviewList = ({ comments }: Props) => {
	return (
		<ul className="reviews__list">
			{comments.slice(0, MAX_REVIEWS_AMOUNT).map((comment) => (
				<Review key={comment.id} comment={comment} />
			))}
		</ul>
	);
};
