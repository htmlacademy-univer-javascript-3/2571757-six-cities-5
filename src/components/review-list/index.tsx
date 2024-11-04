import type { Comment } from '../../types/comment';
import { Review } from '../review';

type Props = {
	comments: Comment[];
};

export const ReviewList = ({ comments }: Props) => {
	return (
		<ul className="reviews__list">
			{comments.map((comment) => (
				<Review key={comment.id} comment={comment} />
			))}
		</ul>
	);
};
