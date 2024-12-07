import { render, screen, waitFor } from '@testing-library/react';
import { NearestOffers } from './';
import { useAppSelector } from '../../store/hooks';
import { useActions } from '../../store/hooks';
import { Mock } from 'vitest';
import { Offer } from '../../types/offer';
import { mockOffer, mockOfferInfo } from '../../mocks/offers';

// Мокируем хук useAppSelector
vi.mock('../../store/hooks', () => ({
	useAppSelector: vi.fn(),
	useActions: vi.fn()
}));

// Мокируем компонент Spinner, OffersList и Map
vi.mock('../spinner', () => ({
	Spinner: () => <div data-testid="spinner" />
}));

vi.mock('../offers-list', () => ({
	OffersList: () => <div data-testid="offers-list" />
}));

vi.mock('../map', () => ({
	Map: () => <div data-testid="map" />
}));

vi.mock('../../utils/convert-offer-info-into-offer', () => ({
	convertOfferInfoToOffer: vi.fn()
}));

describe('NearestOffers', () => {
	const mockFetchNearestOffers = vi.fn();

	beforeEach(() => {
		(useActions as Mock).mockReturnValue({ fetchNearestOffers: mockFetchNearestOffers });
	});

	it('показывает сообщение, если нет ближайших предложений', () => {
		(useAppSelector as Mock).mockReturnValue({
			nearestOffers: null,
			loading: false,
			error: null
		});

		render(<NearestOffers />);

		expect(screen.getByText(/There is no nearest offers/)).toBeInTheDocument();
	});

	it('показывает список предложений и карту, когда данные есть', async () => {
		const offerInfo = { ...mockOfferInfo, id: '1', title: 'Test Offer' };
		const nearestOffers = [
			{ ...mockOffer, id: '2', title: 'Nearby Offer 1' },
			{ ...mockOffer, id: '3', title: 'Nearby Offer 2' }
		];

		(useAppSelector as Mock).mockReturnValue({
			nearestOffers,
			loading: false,
			error: null,
			cityName: 'Test City',
			authorizationStatus: 'AUTHORIZED'
		});

		render(<NearestOffers offerInfo={offerInfo} />);

		await waitFor(() => {
			expect(screen.getByTestId('map')).toBeInTheDocument();
			expect(screen.getByTestId('offers-list')).toBeInTheDocument();
		});
	});

	it('вызывает fetchNearestOffers при наличии offerInfo', () => {
		const offerInfo = { ...mockOfferInfo, id: '1', title: 'Test Offer' };
		const nearestOffers: Offer[] = [];

		(useAppSelector as Mock).mockReturnValue({
			nearestOffers,
			loading: false,
			error: null,
			cityName: 'Test City',
			authorizationStatus: 'AUTHORIZED'
		});

		render(<NearestOffers offerInfo={offerInfo} />);

		expect(mockFetchNearestOffers).toHaveBeenCalledWith({ offerId: offerInfo.id });
	});
});
