import { render, screen } from '@testing-library/react';
import { NoOffersSlug } from './';

describe('NoOffersSlug', () => {
	it('should render the component correctly', () => {
		render(<NoOffersSlug />);

		expect(screen.getByText('No places to stay available')).toBeInTheDocument();

		expect(
			screen.getByText(
				'We could not find any property available at the moment in Dusseldorf'
			)
		).toBeInTheDocument();

		const statusWrapper = screen.getByText('No places to stay available')
			.closest('.cities__status-wrapper');
		expect(statusWrapper).toBeInTheDocument();
		expect(statusWrapper).toHaveClass('tabs__content');

		const rightSection = document.querySelector('.cities__right-section');
		expect(rightSection).toBeInTheDocument();
		expect(rightSection).toBeEmptyDOMElement();
	});

	it('should have correct container class', () => {
		render(<NoOffersSlug />);

		const container = document.querySelector(
			'.cities__places-container.cities__places-container--empty'
		);
		expect(container).toBeInTheDocument();
	});
});
