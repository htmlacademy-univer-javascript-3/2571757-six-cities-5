import { render } from '@testing-library/react';
import { useMap } from '.';
import { Map, TileLayer } from 'leaflet';
import { expect, vi } from 'vitest';
import { OfferCity } from '../../types/offer';

vi.mock('leaflet', async (importOriginal) => {
	const actual = await importOriginal();

	return {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		...actual,
		Map: vi.fn().mockImplementation(() => ({
			addLayer: vi.fn(),
			setView: vi.fn(),
			getCenter: vi.fn().mockReturnValue({ lat: 55.7558, lng: 37.6173 })
		})),
		TileLayer: vi.fn().mockImplementation(() => ({}))
	} as typeof importOriginal;
});


const MapComponent = ({ city }: { city: OfferCity }) => {
	// eslint-disable-next-line
	useMap({ current: document.createElement('div') }, city);
	return null;
};

describe('useMap', () => {
	it('создает карту с заданными координатами при наличии данных города', () => {
		const city = {
			location: {
				latitude: 55.7558,
				longitude: 37.6173
			}
		} as OfferCity;

		render(<MapComponent city={city} />);

		expect(Map).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			center: expect.objectContaining({ lat: 55.7558, lng: 37.6173 }) as OfferCity,
			zoom: 14
		}));

		expect(TileLayer).toHaveBeenCalledWith(
			'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
			expect.objectContaining({
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
			})
		);
	});

	it('не пересоздает карту при изменении города', () => {
		const city1 = {
			location: { latitude: 55.7558, longitude: 37.6173 }
		} as OfferCity;
		const city2 = {
			location: { latitude: 59.9343, longitude: 30.3351 }
		} as OfferCity;

		const { rerender } = render(<MapComponent city={city1} />);

		rerender(<MapComponent city={city2} />);

		expect(Map).toHaveBeenCalledTimes(2);
	});
});
