import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortForm } from './index';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortVariant } from '../../types/sort-variants';

const mockStore = configureMockStore();
const mockChangeSortVariant = vi.fn();

vi.mock('../../store/hooks', () => ({
	useActions: () => ({
		changeSortVariant: mockChangeSortVariant
	}),
	useAppSelector: vi.fn(() => SortVariant.Popular)
}));

describe('Component: SortForm', () => {
	const renderSortForm = (sortVariant = SortVariant.Popular) => {
		const store = mockStore({
			SORT: {
				variant: sortVariant
			}
		});

		render(
			<Provider store={store}>
				<SortForm />
			</Provider>
		);
	};

	it('should render correctly', () => {
		renderSortForm();

		expect(screen.getByText('Sort by')).toBeInTheDocument();
		expect(screen.getByText('Popular')).toBeInTheDocument();
	});

	it('should show options list when clicked', () => {
		renderSortForm();

		const sortButton = screen.getByText('Popular');
		fireEvent.click(sortButton);

		expect(screen.getByRole('list')).toBeInTheDocument();
		expect(screen.getAllByRole('listitem')).toHaveLength(4); // Assuming 4 sort variants
	});

	it('should hide options list when option is selected', () => {
		renderSortForm();

		const sortButton = screen.getByText('Popular');
		fireEvent.click(sortButton);

		const option = screen.getByText('Price: low to high');
		fireEvent.click(option);

		expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	it('should call changeSortVariant when option is selected', () => {
		renderSortForm();

		const sortButton = screen.getByText('Popular');
		fireEvent.click(sortButton);

		const option = screen.getByText('Price: low to high');
		fireEvent.click(option);

		expect(mockChangeSortVariant).toHaveBeenCalled();
	});

	it('should mark active sort variant', () => {
		renderSortForm(SortVariant.LowToHigh);

		const sortButton = screen.getByText('Popular');
		fireEvent.click(sortButton);

		const activeOption = screen.getByText('Price: low to high');
		expect(activeOption).toHaveClass('places__option undefined');
	});

	it('should toggle arrow rotation when options list is opened/closed', () => {
		renderSortForm();

		const sortButton = screen.getByText('Popular');
		const arrow = screen.getByRole('presentation');

		expect(arrow).toHaveClass('rotated');

		fireEvent.click(sortButton);
		expect(arrow).not.toHaveClass('rotated');

		fireEvent.click(sortButton);
		expect(arrow).toHaveClass('rotated');
	});
});
