export const calculateRatingWidth = (rating: number): string => {
	return `${Math.round(rating) * 20}%`;
};
