import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferInfo } from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../types/auth';
import { mockOfferInfo } from '../../mocks/offers';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
	auth: {
		authorizationStatus: AuthorizationStatus.Authorized
	},
	favoriteOffers: {
		postStatus: {
			loading: false,
			error: null
		}
	},
	comments: {
		comments: [],
		fetchStatus: {
			loading: false,
			error: null
		},
		postStatus: {
			loading: false,
			error: null
		}
	}
});

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => vi.fn()
	};
});

describe('Component: OfferInfo', () => {
	const renderOfferInfo = (loading = false) => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<OfferInfo
						offerInfo={mockOfferInfo}
						loading={loading}
					/>
				</MemoryRouter>
			</Provider>
		);
	};

	it('should render spinner when loading', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<OfferInfo loading />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});

	it('should render "Offer data not found" when no offer info provided', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<OfferInfo loading={false} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Offer data not found')).toBeInTheDocument();
	});

	it('should render offer info correctly', () => {
		renderOfferInfo();

		expect(screen.getByText(mockOfferInfo.title)).toBeInTheDocument();
		expect(screen.getByText(mockOfferInfo.description)).toBeInTheDocument();
		expect(screen.getByText(`€${mockOfferInfo.price}`)).toBeInTheDocument();
		expect(screen.getByText(mockOfferInfo.host.name)).toBeInTheDocument();
	});

	it('should render Premium mark when offer is premium', () => {
		const premiumOffer = { ...mockOfferInfo, isPremium: true };
		render(
			<Provider store={store}>
				<MemoryRouter>
					<OfferInfo offerInfo={premiumOffer} loading={false} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Premium')).toBeInTheDocument();
	});

	it('should render all goods from the offer', () => {
		renderOfferInfo();

		mockOfferInfo.goods.forEach((good) => {
			expect(screen.getByText(good)).toBeInTheDocument();
		});
	});

	it('should render host information correctly', () => {
		renderOfferInfo();

		expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
		expect(screen.getByText(mockOfferInfo.host.name)).toBeInTheDocument();
		expect(screen.getByText(mockOfferInfo.host.isPro ? 'Pro' : 'Default')).toBeInTheDocument();
	});

	it('should render correct number of images', () => {
		renderOfferInfo();

		const images = screen.getAllByAltText('Offer Photo');
		expect(images).toHaveLength(Math.min(6, mockOfferInfo.images.length));
	});
});
