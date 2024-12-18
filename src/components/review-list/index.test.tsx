import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewList } from './';
import { mockComment } from '../../mocks/comments';

describe('Component: ReviewList', () => {
	it('should render correctly with comments', () => {
		const mockComments = [
			mockComment,
			mockComment,
			mockComment
		];

		render(<ReviewList comments={mockComments} />);

		const reviewElements = screen.getAllByRole('listitem');
		expect(reviewElements).toHaveLength(mockComments.length);
	});

	it('should render empty list when no comments provided', () => {
		render(<ReviewList comments={[]} />);

		const reviewList = screen.getByRole('list');
		expect(reviewList.children).toHaveLength(0);
	});

	it('should limit the number of comments to 10', () => {
		const mockComments = Array.from({ length: 15 }, () => mockComment);

		render(<ReviewList comments={mockComments} />);

		const reviewElements = screen.getAllByRole('listitem');
		expect(reviewElements).toHaveLength(10);
	});

	it('should render comments with correct content', () => {
		const mockComments = [mockComment];

		render(<ReviewList comments={mockComments} />);

		expect(screen.getByText(mockComments[0].comment)).toBeInTheDocument();
		expect(screen.getByText(mockComments[0].user.name)).toBeInTheDocument();
	});
});
