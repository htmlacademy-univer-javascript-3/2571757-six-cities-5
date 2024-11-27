export const convertDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleString('ru', {
		year: 'numeric',
		month: 'long'
	});
};
