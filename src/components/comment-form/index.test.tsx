import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import { CommentForm } from './';
import { useActions, useAppSelector } from '../../store/hooks';

vi.mock('../../store/hooks', () => ({
	useActions: vi.fn(),
	useAppSelector: vi.fn()
}));

vi.mock('../../store/selectors', () => ({
	selectCommentsReducerData: vi.fn()
}));

vi.mock('../../hooks/use-error-handling', () => ({
	useErrorHandling: vi.fn()
}));

describe('CommentForm Component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
		(useAppSelector as Mock).mockReturnValue({
			postStatus: {
				loading: false,
				error: null
			}
		});
		(useActions as Mock).mockReturnValue({
			postOfferComment: vi.fn()
		});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('updates form data when rating is selected', () => {
		render(<CommentForm offerId="1" />);

		fireEvent.click(screen.getByDisplayValue('5'));

		expect((screen.getByDisplayValue('5') as unknown as HTMLInputElement).checked).toBe(true);
	});

	it('enables submit button when valid comment and rating are provided', () => {
		render(<CommentForm offerId="1" />);

		fireEvent.click(screen.getByDisplayValue('5'));
		fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
			target: { value: 'This is a valid comment with more than 50 characters to pass the validation.' }
		});

		expect(screen.getByText('Submit')).not.toBeDisabled();
	});

	it('disables submit button when rating is not selected', () => {
		render(<CommentForm offerId="1" />);

		fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
			target: { value: 'This is a valid comment with more than 50 characters to pass the validation.' }
		});

		expect(screen.getByText('Submit')).toBeDisabled();
	});

	it('disables submit button when comment is too short', () => {
		render(<CommentForm offerId="1" />);

		fireEvent.click(screen.getByDisplayValue('5'));
		fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
			target: { value: 'Short' }
		});

		expect(screen.getByText('Submit')).toBeDisabled();
	});

	it('disables submit button when comment is too long', () => {
		render(<CommentForm offerId="1" />);

		fireEvent.click(screen.getByDisplayValue('5'));
		fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
			target: { value: 'A'.repeat(301) }
		});

		expect(screen.getByText('Submit')).toBeDisabled();
	});

	it('calls postOfferComment on form submit with valid data', async () => {
		const postOfferCommentMock = vi.fn();
		(useActions as Mock).mockReturnValue({ postOfferComment: postOfferCommentMock });

		render(<CommentForm offerId="1" />);

		fireEvent.click(screen.getByDisplayValue('5'));
		fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
			target: { value: 'This is a valid comment with more than 50 characters to pass the validation.' }
		});

		fireEvent.click(screen.getByText('Submit'));

		await waitFor(() => {
			expect(postOfferCommentMock).toHaveBeenCalledWith({
				offerId: '1',
				comment: 'This is a valid comment with more than 50 characters to pass the validation.',
				rating: 5
			});
		});
	});

	it('resets form data after successful submission', async () => {
		const postOfferCommentMock = vi.fn();
		(useActions as Mock).mockReturnValue({ postOfferComment: postOfferCommentMock });

		render(<CommentForm offerId="1" />);

		fireEvent.click(screen.getByDisplayValue('5'));
		fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
			target: { value: 'This is a valid comment with more than 50 characters to pass the validation.' }
		});

		fireEvent.click(screen.getByText('Submit'));

		await waitFor(() => {
			expect((screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved') as unknown as HTMLInputElement).value).toBe('');
			expect((screen.getByDisplayValue('5') as unknown as HTMLInputElement).checked).toBe(false);
		});
	});
});
