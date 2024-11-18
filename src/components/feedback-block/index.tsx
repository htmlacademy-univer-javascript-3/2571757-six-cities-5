import { useEffect } from 'react';
import { useActions, useAppSelector } from '../../store/hooks';
import { CommentForm } from '../comment-form';
import { ReviewList } from '../review-list';
import { selectCommentsReducerData } from '../../store/selectors';

type Props = {
	offerId: string;
}

export const FeedbackBlock = ({ offerId }: Props) => {
	const { fetchOfferComments } = useActions();
	const { comments } = useAppSelector(selectCommentsReducerData);

	const reviewsAmount = comments.length;

	useEffect(() => {
		if (!offerId) {
			return;
		}

		fetchOfferComments({ offerId });
	}, [offerId, fetchOfferComments]);

	return (
		<section className="offer__reviews reviews">
			<h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span>
			</h2>
			<ReviewList comments={comments} />
			<CommentForm offerId={offerId} />
		</section>
	);
};
