import { authReducer, initialState } from './index';
import { authorize, checkAuthStatus, logout } from '../../action';
import { AuthorizationStatus } from '../../../types/auth';
import { UserData } from '../../../types/user';
import { ErrorResponse } from '../../types';

describe('authReducer', () => {
	it('should return the initial state', () => {
		expect(authReducer(undefined, { type: '' })).toEqual(initialState);
	});

	describe('checkAuthStatus', () => {
		it('should handle checkAuthStatus.pending', () => {
			const action = { type: checkAuthStatus.pending.type };

			const nextState = authReducer(initialState, action);

			expect(nextState.checkAuthStatus).toEqual({ loading: true });
		});

		it('should handle checkAuthStatus.fulfilled', () => {
			const payload: UserData = { id: '1', email: 'test@example.com' };
			const action = { type: checkAuthStatus.fulfilled.type, payload };

			const nextState = authReducer(initialState, action);

			expect(nextState.authorizationStatus).toEqual(AuthorizationStatus.Authorized);
			expect(nextState.userData).toEqual(payload);
			expect(nextState.checkAuthStatus).toEqual({ loading: false });
		});

		it('should handle checkAuthStatus.rejected', () => {
			const action = { type: checkAuthStatus.rejected.type };

			const nextState = authReducer(initialState, action);

			expect(nextState.checkAuthStatus).toEqual({ loading: false });
		});
	});

	describe('authorize', () => {
		it('should handle authorize.pending', () => {
			const action = { type: authorize.pending.type };

			const nextState = authReducer(initialState, action);

			expect(nextState.authorizeStatus).toEqual({ loading: true, error: null });
		});

		it('should handle authorize.fulfilled', () => {
			const payload: UserData = { id: '1', email: 'test@example.com' };
			const action = { type: authorize.fulfilled.type, payload };

			const nextState = authReducer(initialState, action);

			expect(nextState.authorizationStatus).toEqual(AuthorizationStatus.Authorized);
			expect(nextState.userData).toEqual(payload);
			expect(nextState.authorizeStatus).toEqual({ loading: false, error: null });
		});

		it('should handle authorize.rejected with validation errors', () => {
			const payload: ErrorResponse = {
				message: 'Validation failed',
				details: [
					{ property: 'email', messages: ['must be a valid email'], value: 'test@example.com' },
					{ property: 'password', messages: ['must be at least 8 characters'], value: 'password' }
				]
			};
			const action = { type: authorize.rejected.type, payload };

			const nextState = authReducer(initialState, action);

			expect(nextState.authorizeStatus).toEqual({
				loading: false,
				error: payload.message,
				validationErrors: {
					email: 'Must be a valid email',
					password: 'Must be at least 8 characters'
				}
			});
		});

		it('should handle authorize.rejected without validation errors', () => {
			const payload: ErrorResponse = {
				message: 'Internal server error',
				details: []
			};
			const action = { type: authorize.rejected.type, payload };

			const nextState = authReducer(initialState, action);

			expect(nextState.authorizeStatus).toEqual({
				loading: false,
				error: payload.message,
				validationErrors: {}
			});
		});
	});

	describe('logout', () => {
		it('should handle logout.pending', () => {
			const action = { type: logout.pending.type };

			const nextState = authReducer(initialState, action);

			expect(nextState.logoutStatus).toEqual({ loading: true });
		});

		it('should handle logout.fulfilled', () => {
			const action = { type: logout.fulfilled.type };

			const nextState = authReducer(initialState, action);

			expect(nextState.authorizationStatus).toEqual(AuthorizationStatus.Unauthorized);
			expect(nextState.logoutStatus).toEqual({ loading: false });
		});

		it('should handle logout.rejected', () => {
			const payload: ErrorResponse = {
				message: 'Internal server error',
				details: []
			};
			const action = { type: logout.rejected.type, payload };

			const nextState = authReducer(initialState, action);

			expect(nextState.logoutStatus).toEqual({
				loading: false,
				error: payload.message
			});
		});
	});
});
