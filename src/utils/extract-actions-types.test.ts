import { describe, it, expect } from 'vitest';
import { extractActionsTypes } from './extract-actions-types'; // Adjust the import path
import { Action } from '@reduxjs/toolkit';

describe('extractActionsTypes', () => {
	it('should return an array of action types', () => {
		const actions = [
			{ type: 'ACTION_TYPE_ONE' },
			{ type: 'ACTION_TYPE_TWO' },
			{ type: 'ACTION_TYPE_THREE' }
		];

		const result = extractActionsTypes(actions);

		expect(result).toEqual(['ACTION_TYPE_ONE', 'ACTION_TYPE_TWO', 'ACTION_TYPE_THREE']);
	});

	it('should return an empty array when no actions are provided', () => {
		const actions: Action<string>[] = [];

		const result = extractActionsTypes(actions);

		expect(result).toEqual([]);
	});
});
