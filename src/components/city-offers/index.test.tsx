import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { CityOffers } from './';
import { Offer } from '../../types/offer';
import { mockOffer } from '../../mocks/offers';
import { Cities } from '../../types/cities';
import { useAppSelector } from '../../store/hooks';

vi.mock('../../store/hooks', () => ({
	useAppSelector: vi.fn()
}));

vi.mock('../../store/selectors', () => ({
	selectCityName: vi.fn()
}));

vi.mock('../../components/no-offers-slug', () => ({
	NoOffersSlug: () => <div>No places to stay available</div>
}));

vi.mock('../../components/offers-list', () => ({
	OffersList: ({ offers }: { offers: Offer[] }) => (
		<ul>{offers.map((offer) => <li key={offer.id}>{offer.title}</li>)}</ul>
	)
}));

vi.mock('../../components/map', () => ({
	Map: ({ offers }: { offers: Offer[] }) => (
		<div data-testid="map-component">{offers.length} offers on map</div>
	)
}));

vi.mock('../../components/sort-form', () => ({
	SortForm: () => <div>Sort Form</div>
}));

describe('CityOffers Component', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('renders the list of offers when offers are available', () => {
		const offers: Offer[] = [
			{ ...mockOffer, id: '1', title: 'Offer 1' },
			{ ...mockOffer, id: '2', title: 'Offer 2' }
		];

		render(<CityOffers offers={offers} />);

		expect(screen.getByText('Offer 1')).toBeInTheDocument();
		expect(screen.getByText('Offer 2')).toBeInTheDocument();
	});

	it('shows the NoOffersSlug component when no offers are available', () => {
		const offers: Offer[] = [];

		render(<CityOffers offers={offers} />);

		expect(screen.getByText('No places to stay available')).toBeInTheDocument();
	});

	it('correctly updates hovered offer when an offer is hovered', () => {
		const offers: Offer[] = [
			{ ...mockOffer, id: '1', title: 'Offer 1' },
			{ ...mockOffer, id: '2', title: 'Offer 2' }
		];

		render(<CityOffers offers={offers} />);

		const offer1 = screen.getByText('Offer 1');

		fireEvent.mouseEnter(offer1);

		expect(screen.getByText('Offer 1')).toBeInTheDocument();
	});

	it('renders the map component when offers are available', () => {
		const offers: Offer[] = [
			{ ...mockOffer, id: '1', title: 'Offer 1' },
			{ ...mockOffer, id: '2', title: 'Offer 2' }
		];

		render(<CityOffers offers={offers} />);

		expect(screen.getByTestId('map-component')).toBeInTheDocument();
	});

	it('correctly displays the number of places in the city', () => {
		const offers: Offer[] = [
			{ ...mockOffer, id: '1', title: 'Offer 1' },
			{ ...mockOffer, id: '2', title: 'Offer 2' }
		];

		(useAppSelector as Mock).mockReturnValue(Cities.Amsterdam);

		render(<CityOffers offers={offers} />);

		expect(screen.getByText(`${offers.length} places to stay in ${Cities.Amsterdam}`)).toBeInTheDocument();
	});

	it('does not render the Map component when no offers are available', () => {
		const offers: Offer[] = [];

		render(<CityOffers offers={offers} />);

		expect(screen.queryByTestId('map-component')).not.toBeInTheDocument();
	});
});
