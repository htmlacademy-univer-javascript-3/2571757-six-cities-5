import { CITIES } from '../constants/cities';

export const generateRandomCity = () => {
	return CITIES[Math.floor(Math.random() * CITIES.length)];
};
