import { convertDate } from './convert-date';

describe('convertDate', () => {
	it('should convert a valid date string into a localized Russian format', () => {
		const dateString = '2019-05-08T14:13:56.569Z';
		expect(convertDate(dateString)).toBe('май 2019 г.');
	});
});
