export const getRatingTitle = (rating: number): string => {
	switch (rating) {
		case 5:
			return 'perfect';
		case 4:
			return 'good';
		case 3:
			return 'not bad';
		case 2:
			return 'badly';
		case 1:
			return 'terribly';
		default:
			return '';
	}
};
