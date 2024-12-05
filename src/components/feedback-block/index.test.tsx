import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { FeedbackBlock } from './';
import { useActions, useAppSelector } from '../../store/hooks';
import { selectAuthReducerData, selectCommentsReducerData } from '../../store/selectors';
import { AuthorizationStatus } from '../../types/auth';

vi.mock('../../store/hooks', () => ({
	useActions: vi.fn(),
	useAppSelector: vi.fn()
}));

vi.mock('../../store/selectors', () => ({
	selectAuthReducerData: vi.fn(),
	selectCommentsReducerData: vi.fn()
}));

vi.mock('../comment-form', () => ({
	CommentForm: () => <div data-testid="comment-form" />
}));

vi.mock('../review-list', () => ({
	ReviewList: () => <div data-testid="review-list" />
}));

vi.mock('../spinner', () => ({
	Spinner: () => <div data-testid="spinner" />
}));

describe('FeedbackBlock Component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
		(useActions as Mock).mockReturnValue({
			fetchOfferComments: vi.fn()
		});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('fetches comments on mount', () => {
		const fetchOfferCommentsMock = vi.fn();
		(useActions as Mock).mockReturnValue({ fetchOfferComments: fetchOfferCommentsMock });
		(useAppSelector as Mock).mockReturnValue({ comments: [], fetchStatus: { loading: false, error: null } });

		render(<FeedbackBlock offerId="1" />);

		expect(fetchOfferCommentsMock).toHaveBeenCalledWith({ offerId: '1' });
	});

	it('renders the Spinner while loading', () => {
		(useAppSelector as Mock).mockImplementation((selector) => {
			if (selector === selectCommentsReducerData) {
				return { comments: [], fetchStatus: { loading: true, error: null } };
			}
			if (selector === selectAuthReducerData) {
				return { authorizationStatus: AuthorizationStatus.Unauthorized };
			}
		});

		render(<FeedbackBlock offerId="1" />);

		expect(screen.getByTestId('spinner')).toBeInTheDocument();
		expect(screen.queryByTestId('review-list')).not.toBeInTheDocument();
	});

	it('renders the ReviewList after loading', () => {
		(useAppSelector as Mock).mockImplementation((selector) => {
			if (selector === selectCommentsReducerData) {
				return { comments: [{ id: 1, comment: 'Test comment' }], fetchStatus: { loading: false, error: null } };
			}
			if (selector === selectAuthReducerData) {
				return { authorizationStatus: AuthorizationStatus.Unauthorized };
			}
		});

		render(<FeedbackBlock offerId="1" />);

		expect(screen.getByTestId('review-list')).toBeInTheDocument();
		expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
	});

	it('renders the CommentForm when user is authorized', () => {
		(useAppSelector as Mock).mockImplementation((selector) => {
			if (selector === selectCommentsReducerData) {
				return { comments: [], fetchStatus: { loading: false, error: null } };
			}
			if (selector === selectAuthReducerData) {
				return { authorizationStatus: AuthorizationStatus.Authorized };
			}
		});

		render(<FeedbackBlock offerId="1" />);

		expect(screen.getByTestId('comment-form')).toBeInTheDocument();
	});

	it('does not render the CommentForm when user is unauthorized', () => {
		(useAppSelector as Mock).mockImplementation((selector) => {
			if (selector === selectCommentsReducerData) {
				return { comments: [], fetchStatus: { loading: false, error: null } };
			}
			if (selector === selectAuthReducerData) {
				return { authorizationStatus: AuthorizationStatus.Unauthorized };
			}
		});

		render(<FeedbackBlock offerId="1" />);

		expect(screen.queryByTestId('comment-form')).not.toBeInTheDocument();
	});
});
