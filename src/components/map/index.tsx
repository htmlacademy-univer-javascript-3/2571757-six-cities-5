import { useRef, useEffect } from 'react';
import { Marker, layerGroup, LatLngBounds, LatLngBoundsLiteral } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import type { Offer } from '../../types/offer';
import type { MarkerRef } from '../../types/map';
import {
	defaultCustomIcon,
	currentCustomIcon,
	DEFAULT_MAP_ZOOM
} from '../../constants/map';
import 'leaflet/dist/leaflet.css';
import { Cities } from '../../types/cities';

type Props = {
	width?: string;
	height?: string;
	offers: Offer[];
	selectedOffer?: Offer;
	activeCityName: Cities;
};

export const Map = ({
	width = '512px',
	height = '100%',
	offers,
	activeCityName,
	selectedOffer
}: Props): JSX.Element => {
	const mapRef = useRef(null);
	const markerLayerRef = useRef(layerGroup());
	const markersRef = useRef<MarkerRef[]>([]);

	const cityData = offers.find((offer) => offer.city.name === activeCityName)?.city;
	const points = offers
		.filter((offer) => offer.city.name === activeCityName)
		.map((offer) => ({ id: offer.id, title: offer.title, ...offer.location }));

	const map = useMap(mapRef, cityData);

	useEffect(() => {
		if (map && cityData) {
			markerLayerRef.current.clearLayers();
			markersRef.current = [];

			const markers = points.map(({ latitude, longitude, id, title }) => {
				const marker = new Marker({ lat: latitude, lng: longitude })
					.setIcon(
						selectedOffer && id === selectedOffer.id
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayerRef.current);

				markersRef.current.push({ marker, title });

				return [latitude, longitude];
			}) as unknown as LatLngBoundsLiteral;

			markerLayerRef.current.addTo(map);

			const bounds = new LatLngBounds(markers);

			map.fitBounds(bounds, { padding: [50, 50], maxZoom: DEFAULT_MAP_ZOOM });
		}
	}, [map, points, selectedOffer, activeCityName, cityData]);

	return <div style={{ width, height }} ref={mapRef}></div>;
};
