import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './';
import { useActions, useAppSelector } from '../../store/hooks';
import { AuthorizationStatus } from '../../types/auth';
import { AppRoutes } from '../../constants/routes';

vi.mock('../../store/hooks', () => ({
	useActions: vi.fn(),
	useAppSelector: vi.fn()
}));

vi.mock('../../hooks/use-error-handling', () => ({
	useErrorHandling: vi.fn()
}));

describe('Header Component', () => {
	const mockLogout = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(useActions as Mock).mockReturnValue({ logout: mockLogout });
	});

	it('renders the logo with the correct link', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized, userData: null, logoutStatus: {} });

		render(
			<Router>
				<Header />
			</Router>
		);

		const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
		expect(logoLink).toHaveAttribute('href', AppRoutes.Default);
		expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
	});

	it('renders the navigation when `withNav` is true', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized, userData: null, logoutStatus: {} });

		render(
			<Router>
				<Header withNav />
			</Router>
		);

		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('hides the navigation when `withNav` is false', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized, userData: null, logoutStatus: {} });

		render(
			<Router>
				<Header withNav={false} />
			</Router>
		);

		expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
	});

	it('renders the login link when user is unauthorized', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized, userData: null, logoutStatus: {} });

		render(
			<Router>
				<Header />
			</Router>
		);

		const loginLink = screen.getByRole('link', { name: /sign in/i });
		expect(loginLink).toHaveAttribute('href', AppRoutes.Login);
	});

	it('renders user info and logout button when user is authorized', () => {
		(useAppSelector as Mock).mockImplementation((selector: string) => {
			if (selector === 'selectAuthReducerData') {
				return {
					authorizationStatus: AuthorizationStatus.Authorized,
					userData: { avatarUrl: 'avatar.jpg', email: 'user@example.com' }
				};
			}
			if (selector === 'selectFavoriteOffersReducerData') {
				return {
					favoritesOffers: [{ id: 1 }, { id: 2 }]
				};
			}
		}).mockReturnValue({ authorizationStatus: AuthorizationStatus.Authorized, userData: { avatarUrl: 'avatar.jpg', email: 'user@example.com' }, logoutStatus: {} });

		render(
			<Router>
				<Header />
			</Router>
		);

		expect(screen.getByAltText('User avatar')).toHaveAttribute('src', 'avatar.jpg');
		expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();

		const logoutButton = screen.getByText(/sign out/i);
		fireEvent.click(logoutButton);
		expect(mockLogout).toHaveBeenCalled();
	});
});
