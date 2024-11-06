import type { Marker } from 'leaflet';
import { OfferLocation } from './offer';

export type Point = {
	title: string;
} & OfferLocation;

export type MarkerRef = { marker: Marker; title: string };
