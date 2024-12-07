import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import { Footer } from './';

const Component = () => (
	<BrowserRouter>
		<Footer />
	</BrowserRouter>
);

describe('Footer', () => {
	it('renders the footer component', () => {
		render(<Component />);

		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
	});

	it('renders the logo with correct attributes', () => {
		render(<Component />);

		const logo = screen.getByRole('img', { name: /6 cities logo/i });
		expect(logo).toHaveAttribute('src', 'img/logo.svg');
		expect(logo).toHaveAttribute('alt', '6 cities logo');
		expect(logo).toHaveAttribute('width', '64');
		expect(logo).toHaveAttribute('height', '33');
	});

	it('renders a link to the default route', () => {
		render(<Component />);

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', AppRoutes.Default);
	});
});
