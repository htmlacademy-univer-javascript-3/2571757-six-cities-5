import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CityTab } from './';
import { Cities } from '../../types/cities';

const mockOnChange = vi.fn();
const cityName: Cities = Cities.Paris;

describe('CityTab', () => {
	it('renders the city name', () => {
		render(<CityTab name={cityName} isActive={false} onChange={mockOnChange} />);

		expect(screen.getByText(cityName)).toBeInTheDocument();
	});

	it('applies active class when isActive is true', () => {
		render(<CityTab name={cityName} isActive onChange={mockOnChange} />);

		const tabElement = screen.getByText(cityName).parentElement;

		expect(tabElement).toHaveClass('tabs__item--active');
	});

	it('does not apply active class when isActive is false', () => {
		render(<CityTab name={cityName} isActive={false} onChange={mockOnChange} />);

		const tabElement = screen.getByText(cityName).parentElement;

		expect(tabElement).not.toHaveClass('tabs__item--active');
	});

	it('calls onChange with the correct city name when clicked', () => {
		render(<CityTab name={cityName} isActive={false} onChange={mockOnChange} />);

		const tabElement = screen.getByText(cityName).parentElement;
		fireEvent.click(tabElement!);

		expect(mockOnChange).toHaveBeenCalledWith(cityName);
		expect(mockOnChange).toHaveBeenCalledTimes(1);
	});
});
