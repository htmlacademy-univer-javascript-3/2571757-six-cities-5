import { describe, it, expect } from 'vitest';
import { sortCommentsByDate } from './sort-by-date';
import type { Comment } from '../types/comment';

describe('sortCommentsByDate', () => {
	const comments: Comment[] = [
		{
			id: '1',
			date: '2024-12-05T12:00:00.000Z',
			user: { name: 'John Doe', avatarUrl: '', isPro: false },
			comment: 'First comment',
			rating: 4
		},
		{
			id: '2',
			date: '2024-12-06T12:00:00.000Z',
			user: { name: 'Jane Doe', avatarUrl: '', isPro: true },
			comment: 'Second comment',
			rating: 5
		},
		{
			id: '3',
			date: '2024-12-04T12:00:00.000Z',
			user: { name: 'Alice', avatarUrl: '', isPro: false },
			comment: 'Third comment',
			rating: 3
		}
	];

	it('should sort comments by date in descending order', () => {
		const sortedComments = sortCommentsByDate(comments);

		expect(sortedComments[0].date).toBe('2024-12-06T12:00:00.000Z'); // Latest comment first
		expect(sortedComments[1].date).toBe('2024-12-05T12:00:00.000Z');
		expect(sortedComments[2].date).toBe('2024-12-04T12:00:00.000Z');
	});

	it('should return an empty array when the input is empty', () => {
		const sortedComments = sortCommentsByDate([]);
		expect(sortedComments).toEqual([]);
	});

	it('should return the same comment when there is only one comment', () => {
		const singleComment: Comment[] = [
			{
				id: '1',
				date: '2024-12-05T12:00:00.000Z',
				user: { name: 'John Doe', avatarUrl: '', isPro: false },
				comment: 'Single comment',
				rating: 4
			}
		];

		const sortedComments = sortCommentsByDate(singleComment);
		expect(sortedComments).toEqual(singleComment);
	});

	it('should not change the order of comments with identical dates', () => {
		const sameDateComments: Comment[] = [
			{
				id: '1',
				date: '2024-12-05T12:00:00.000Z',
				user: { name: 'John Doe', avatarUrl: '', isPro: false },
				comment: 'Comment 1',
				rating: 4
			},
			{
				id: '2',
				date: '2024-12-05T12:00:00.000Z',
				user: { name: 'Jane Doe', avatarUrl: '', isPro: true },
				comment: 'Comment 2',
				rating: 5
			}
		];

		const sortedComments = sortCommentsByDate(sameDateComments);
		expect(sortedComments).toEqual(sameDateComments);
	});
});
