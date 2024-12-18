import { capitalize } from './capitalize';

describe('capitalize', () => {
	it('should capitalize the first letter of a lowercase string', () => {
		expect(capitalize('hello')).toBe('Hello');
	});

	it('should return the same string if the first letter is already capitalized', () => {
		expect(capitalize('Hello')).toBe('Hello');
	});

	it('should handle a string with only one character', () => {
		expect(capitalize('a')).toBe('A');
	});

	it('should return an empty string if the input is empty', () => {
		expect(capitalize('')).toBe('');
	});

	it('should not alter a string with a single uppercase letter', () => {
		expect(capitalize('Z')).toBe('Z');
	});

	it('should capitalize the first letter and keep the rest of the string intact', () => {
		expect(capitalize('javaScript')).toBe('JavaScript');
	});

	it('should handle strings with special characters correctly', () => {
		expect(capitalize('!hello')).toBe('!hello');
	});
});
