import { useRef, useEffect, useState } from 'react';
import { Marker, layerGroup } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import type { Offer } from '../../types/offer';
import type { MarkerRef } from '../../types/map';
import {
	defaultCustomIcon,
	currentCustomIcon
} from '../../constants/map';
import 'leaflet/dist/leaflet.css';

type Props = {
	width?: string;
	height?: string;
	offers: Offer[];
	selectedOffer?: Offer;
	activeCityName: string;
};

export const Map = ({
	width = '512px',
	height = '100%',
	offers,
	activeCityName,
	selectedOffer
}: Props): JSX.Element => {
	const [{ city, points }] = useState(() => {
		const filteredOffers = offers.filter((offer) => offer.city.name === activeCityName);
		const offerData = filteredOffers.find((offer) => offer.city.name === activeCityName);

		return {
			city: offerData?.city,
			points: filteredOffers.map((offer) => ({ title: offer.title, ...offer.location }))
		};
	});

	const mapRef = useRef(null);
	const map = useMap(mapRef, city);
	const markerLayerRef = useRef(layerGroup());
	const markersRef = useRef<MarkerRef[]>([]);

	useEffect(() => {
		if (map) {
			if (!markersRef.current.length) {
				points.forEach(({ latitude, longitude, title }) => {
					const marker = new Marker({ lat: latitude, lng: longitude })
						.setIcon(
							selectedOffer && title === selectedOffer.title
								? currentCustomIcon
								: defaultCustomIcon
						)
						.addTo(markerLayerRef.current);
					markersRef.current.push({ marker, title });
				});

				markerLayerRef.current.addTo(map);
			} else {
				markersRef.current.forEach(({ marker, title }) => {
					marker.setIcon(
						selectedOffer && title === selectedOffer.title
							? currentCustomIcon
							: defaultCustomIcon
					);
				});
			}
		}
	}, [map, points, selectedOffer]);

	return <div style={{ width, height }} ref={mapRef}></div>;
};
