import { render, screen } from '@testing-library/react';
import { Review } from './';
import { calculateRatingWidth } from '../../utils/calculate-rating-width';
import { convertDate } from '../../utils/convert-date';
import { mockComment } from '../../mocks/comments';

vi.mock('../../utils/calculate-rating-width', () => ({
	calculateRatingWidth: vi.fn().mockReturnValue('80%')
}));
vi.mock('../../utils/convert-date', () => ({
	convertDate: vi.fn().mockReturnValue('December 4, 2024')
}));

describe('Review Component', () => {
	it('should render user name and avatar', () => {
		render(<Review comment={mockComment} />);

		expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();

		const avatar = screen.getByAltText('Reviews avatar');
		expect(avatar).toHaveAttribute('src', mockComment.user.avatarUrl);
	});

	it('should render the comment text', () => {
		render(<Review comment={mockComment} />);

		expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
	});

	it('should apply correct rating width', () => {
		render(<Review comment={mockComment} />);

		expect(calculateRatingWidth).toHaveBeenCalledWith(mockComment.rating);

		const ratingElement = screen.getByText('Rating').closest('.reviews__stars');
		const spanElement = ratingElement?.querySelector('span');
		expect(spanElement).toHaveStyle('width: 80%');
	});

	it('should display the formatted date', () => {
		render(<Review comment={mockComment} />);

		expect(convertDate).toHaveBeenCalledWith(mockComment.date);

		expect(screen.getByText('December 4, 2024')).toBeInTheDocument();
	});
});
