import { render, screen, waitFor } from '@testing-library/react';
import { configureMockStore, MockStoreEnhanced } from '@jedmao/redux-mock-store';
import { Router } from './';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../types/auth.ts';
import { vi } from 'vitest';
import { RootState } from '../../store/types';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes.ts';

vi.mock('../../pages/main-page', () => ({ default: () => <div>Main Page</div> }));
vi.mock('../../pages/login-page', () => ({ default: () => <div>Login Page</div> }));
vi.mock('../../pages/favorites-page', () => ({ default: () => <div>Favorites Page</div> }));
vi.mock('../../pages/offer-page', () => ({ default: () => <div>Offer Page</div> }));
vi.mock('../../pages/404', () => ({ default: () => <div>404 Page</div> }));
vi.mock('../../components/private-route', () => ({
	PrivateRoute: ({ children }: { children: JSX.Element }) => children
}));
vi.mock('../../components/layout/index.tsx', () => ({
	Layout: () => (
		<div>
			Layout <Outlet />
		</div>
	)
}));

vi.mock('../../store/hooks.ts', () => ({
	useActions: () => ({
		checkAuthStatus: vi.fn(),
		fetchFavoritesOffers: vi.fn()
	}),
	useAppSelector: vi.fn(() => ({
		authorizationStatus: AuthorizationStatus.Unauthorized
	}))
}));

const mockStore = configureMockStore();

const renderWithProviders = (
	Component: JSX.Element,
	store: MockStoreEnhanced<RootState>,
	initialEntries: string[] = [AppRoutes.Default]
) => {
	return render(
		<Provider store={store}>
			<MemoryRouter initialEntries={initialEntries}>
				{Component}
			</MemoryRouter>
		</Provider>
	);
};

describe('Router', () => {
	const store = mockStore({
		auth: { authorizationStatus: AuthorizationStatus.Unauthorized }
	});

	it('should render Main Page on default route', async () => {
		renderWithProviders(<Router />, store, [AppRoutes.Default]);

		await waitFor(() => expect(screen.getByText('Main Page')).toBeInTheDocument());
	});

	it('should render Login Page when navigating to /login', async () => {
		renderWithProviders(<Router />, store, [AppRoutes.Login]);

		await waitFor(() => expect(screen.getByText('Login Page')).toBeInTheDocument());
	});

	it('should render Favorites Page when user is authorized', async () => {
		const localStore = mockStore({
			auth: { authorizationStatus: AuthorizationStatus.Authorized }
		});
		renderWithProviders(<Router />, localStore, [AppRoutes.Favorites]);

		await waitFor(() => expect(screen.getByText('Favorites Page')).toBeInTheDocument());
	});

	it('should render 404 Page for an unknown route', async () => {
		renderWithProviders(<Router />, store, ['/unknown']);

		await waitFor(() => expect(screen.getByText('404 Page')).toBeInTheDocument());
	});

	it('should render Offer Page for /offer:id route', async () => {
		renderWithProviders(<Router />, store, [`${AppRoutes.Offer}/1`]);

		await waitFor(() => expect(screen.getByText('Offer Page')).toBeInTheDocument());
	});
});
