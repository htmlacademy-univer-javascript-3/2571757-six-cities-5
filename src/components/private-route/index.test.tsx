import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { PrivateRoute } from './';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/auth.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { getToken } from '../../store/utils/index.ts';

vi.mock('../../store/hooks.ts', () => ({
	useAppSelector: vi.fn()
}));

vi.mock('../../store/utils/index.ts', () => ({
	getToken: vi.fn()
}));

const Component = ({ content }: { content: string }) => {
	return (
		<Router>
			<PrivateRoute>
				<div>{content}</div>
			</PrivateRoute>
		</Router>
	);
};

describe('PrivateRoute', () => {
	it('should render children if user authorized', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Authorized });

		(getToken as Mock).mockReturnValue('valid_token');

		render(<Component content='Authorized Content' />);

		expect(screen.getByText('Authorized Content')).toBeInTheDocument();
	});

	it('should redirect to login page if user unauthorized', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized });

		(getToken as Mock).mockReturnValue(null);

		render(<Component content='Authorized Content' />);

		expect(screen.queryByText('Authorized Content')).not.toBeInTheDocument();
		expect(window.location.pathname).toBe('/login');
	});

	it('should redirect to login page if there is no token and unauthorized status', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized });

		(getToken as Mock).mockReturnValue(null);

		render(<Component content='Authorized Content' />);

		expect(screen.queryByText('Authorized Content')).not.toBeInTheDocument();
		expect(window.location.pathname).toBe('/login');
	});

	it('should redirect to login page if token is unavailable and unauthorized status', () => {
		(useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthorizationStatus.Unauthorized });

		(getToken as Mock).mockReturnValue('');

		render(<Component content='Authorized Content' />);

		expect(screen.queryByText('Authorized Content')).not.toBeInTheDocument();
		expect(window.location.pathname).toBe('/login');
	});
});
