import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferCard } from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../types/auth';
import { mockOffer } from '../../mocks/offers';
import { OfferPreviewType } from '../../types/offer';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
	auth: {
		authorizationStatus: AuthorizationStatus.Authorized
	},
	favoriteOffers: {
		postStatus: {
			loading: false
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

describe('Component: OfferCard', () => {
	const mockOnHover = vi.fn();

	const renderOfferCard = (previewType = 'default' as OfferPreviewType) => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<OfferCard
						offer={mockOffer}
						previewType={previewType}
						onHover={mockOnHover}
					/>
				</MemoryRouter>
			</Provider>
		);
	};

	it('should render correctly with default preview type', () => {
		renderOfferCard();

		expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
		expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
		expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
		expect(screen.getByAltText(`${mockOffer.title} place image`)).toBeInTheDocument();
	});

	it('should render Premium mark when offer is premium', () => {
		const premiumOffer = { ...mockOffer, isPremium: true };
		render(
			<Provider store={store}>
				<MemoryRouter>
					<OfferCard
						offer={premiumOffer}
						previewType="default"
						onHover={mockOnHover}
					/>
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Premium')).toBeInTheDocument();
	});

	it('should call onHover when mouse enters and leaves', () => {
		renderOfferCard();

		const article = screen.getByRole('article');

		fireEvent.mouseEnter(article);
		expect(mockOnHover).toHaveBeenCalledWith(mockOffer.id);

		fireEvent.mouseLeave(article);
		expect(mockOnHover).toHaveBeenCalledWith(undefined);
	});

	it('should render with favorites preview type', () => {
		renderOfferCard('favorites');

		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('width', '150');
		expect(image).toHaveAttribute('height', '110');
	});

	it('should render bookmark button correctly', () => {
		renderOfferCard();

		const bookmarkButton = screen.getByRole('button');
		expect(bookmarkButton).toBeInTheDocument();
		expect(bookmarkButton).not.toBeDisabled();
	});
});
