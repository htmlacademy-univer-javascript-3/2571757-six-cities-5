import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { OfferCity } from '../types/offer';
import { DEFAULT_MAP_ZOOM } from '../constants/map';

export const useMap = (
	mapRef: MutableRefObject<HTMLElement | null>,
	city?: OfferCity
): Map | null => {
	const [map, setMap] = useState<Map | null>(null);
	const isRenderedRef = useRef<boolean>(false);

	useEffect(() => {
		if (mapRef.current && !isRenderedRef.current && city) {
			const { latitude, longitude } = city.location;

			const instance = new Map(mapRef.current, {
				center: {
					lat: latitude,
					lng: longitude
				},
				zoom: DEFAULT_MAP_ZOOM
			});

			const layer = new TileLayer(
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
				{
					attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
				}
			);

			instance.addLayer(layer);

			setMap(instance);
			isRenderedRef.current = true;
		}
	}, [mapRef, city]);

	return map;
};
