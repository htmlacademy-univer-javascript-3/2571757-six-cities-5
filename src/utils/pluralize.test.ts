import { describe, it, expect } from 'vitest';
import { pluralize } from './pluralize';

describe('pluralize', () => {
	it('should return the singular form when count is 1', () => {
		const result = pluralize(1, ['apple', 'apples']);
		expect(result).toBe('1 apple');
	});

	it('should return the plural form when count is greater than 1', () => {
		const result = pluralize(2, ['apple', 'apples']);
		expect(result).toBe('2 apples');
	});

	it('should handle other plural cases correctly', () => {
		const result1 = pluralize(5, ['apple', 'apples']);
		expect(result1).toBe('5 apples');

		const result2 = pluralize(100, ['apple', 'apples']);
		expect(result2).toBe('100 apples');
	});

	it('should handle non-integer values correctly', () => {
		const result = pluralize(1.5, ['apple', 'apples']);
		expect(result).toBe('1.5 apples');
	});

	it('should return correct result for zero', () => {
		const result = pluralize(0, ['apple', 'apples']);
		expect(result).toBe('0 apples');
	});
});
