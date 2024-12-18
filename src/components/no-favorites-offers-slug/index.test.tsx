import { render, screen } from '@testing-library/react';
import { NoFavoritesOffersSlug } from './';

describe('NoFavoritesOffersSlug', () => {
	it('should render correctly when no favorite offers are present', () => {
		render(<NoFavoritesOffersSlug />);

		expect(screen.getByRole('heading', { name: /favorites \(empty\)/i })).toBeInTheDocument();
		expect(screen.getByText(/nothing yet saved/i)).toBeInTheDocument();
		expect(
			screen.getByText(/save properties to narrow down search or plan your future trips/i)
		).toBeInTheDocument();
	});
});
