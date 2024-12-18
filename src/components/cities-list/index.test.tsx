import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { CitiesList } from './';
import { useAppSelector, useActions } from '../../store/hooks';
import { CITIES as citiesList } from '../../constants/cities.ts';
import { Cities } from '../../types/cities.ts';

vi.mock('../../store/hooks', () => ({
	useAppSelector: vi.fn(),
	useActions: vi.fn()
}));

describe('CitiesList', () => {
	it('should show cities list', () => {
		(useAppSelector as Mock).mockReturnValue(Cities.Amsterdam);
		(useActions as Mock).mockReturnValue({ changeCity: vi.fn() });

		render(<CitiesList />);

		citiesList.forEach((city) => {
			expect(screen.getByText(city)).toBeInTheDocument();
		});
	});

	it('should use special styles for active city', () => {
		(useAppSelector as Mock).mockReturnValue(Cities.Amsterdam);
		(useActions as Mock).mockReturnValue({ changeCity: vi.fn() });

		render(<CitiesList />);

		expect(screen.getByText(Cities.Amsterdam).parentElement).toHaveClass('tabs__item--active');
	});

	it('should correctly change city', () => {
		const changeCityMock = vi.fn();

		(useAppSelector as Mock).mockReturnValue(Cities.Amsterdam);
		(useActions as Mock).mockReturnValue({ changeCity: changeCityMock });

		render(<CitiesList />);

		fireEvent.click(screen.getByText(Cities.Dusseldorf));

		expect(changeCityMock).toHaveBeenCalledWith(Cities.Dusseldorf);
	});
});
