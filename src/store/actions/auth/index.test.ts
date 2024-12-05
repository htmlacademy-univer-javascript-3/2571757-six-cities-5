import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { checkAuthStatus, logout, authorize } from './';
import { AppThunkDispatch, RootState } from '../../types';
import { Actions } from '../../../constants/actions';
import { extractActionsTypes } from '../../../utils/extract-actions-types';
import { saveToken } from '../../utils';
import { Paths } from '../../../api/constants';
import { TOKEN_STORAGE_KEY } from '../../../constants/storage';
import { AppActions, AuthorizeFulfilledAction, AuthorizeRejectedAction, CheckAuthStatusFulfilledAction, CheckAuthStatusRejectedAction } from '../types';
import api from '../../../api';

describe('Async actions', () => {
	const mockAxiosAdapter = new MockAdapter(api);
	const middleware = [thunk.withExtraArgument(api)];
	const mockStoreCreator = configureMockStore<RootState, AppActions, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
		mockAxiosAdapter.reset();
		localStorage.clear();
	});

	describe('checkAuthStatus', () => {
		it('should dispatch "checkAuthStatus.pending" and "checkAuthStatus.fulfilled" on success', async () => {
			const mockResponse = {
				name: 'Oliver Conner',
				avatarUrl: 'https://url-to-image/image.png',
				isPro: false,
				email: 'oliver.conner@gmail.com',
				token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
			};

			mockAxiosAdapter.onGet(Paths.Login).reply(200, mockResponse);

			await store.dispatch(checkAuthStatus());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.CHECK_AUTH_STATUS}/pending`,
				`${Actions.CHECK_AUTH_STATUS}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.CHECK_AUTH_STATUS}/fulfilled`
			) as CheckAuthStatusFulfilledAction;
			expect(fulfilledAction?.payload).toEqual(mockResponse);
		});

		it('should dispatch "checkAuthStatus.pending" and "checkAuthStatus.rejected" on failure', async () => {
			mockAxiosAdapter.onGet(Paths.Login).reply(401, {
				errorType: 'COMMON_ERROR',
				message: 'Access deny.'
			});

			await store.dispatch(checkAuthStatus());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.CHECK_AUTH_STATUS}/pending`,
				`${Actions.CHECK_AUTH_STATUS}/rejected`
			]);

			const rejectedAction = store.getActions().find(
				(action) => action.type === `${Actions.CHECK_AUTH_STATUS}/rejected`
			) as CheckAuthStatusRejectedAction;
			expect(rejectedAction?.payload.message).toBe('Access deny.');
		});

		it('should call "saveToken" with the received token on success', async () => {
			const mockResponse = {
				name: 'Oliver Conner',
				avatarUrl: 'https://url-to-image/image.png',
				isPro: false,
				email: 'oliver.conner@gmail.com',
				token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
			};

			mockAxiosAdapter.onGet(Paths.Login).reply(200, mockResponse);
			await store.dispatch(checkAuthStatus());

			expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toEqual(mockResponse.token);
		});

		it('should not call "saveToken" if no token is received', async () => {
			const mockResponse = {
				name: 'Oliver Conner',
				avatarUrl: 'https://url-to-image/image.png',
				isPro: false,
				email: 'oliver.conner@gmail.com'
			};

			mockAxiosAdapter.onGet(Paths.Login).reply(200, mockResponse);
			const mockSaveToken = vi.spyOn({ saveToken }, 'saveToken');

			await store.dispatch(checkAuthStatus());

			expect(mockSaveToken).not.toHaveBeenCalled();
		});

		it('should call "removeToken" on rejected response', async () => {
			mockAxiosAdapter.onGet(Paths.Login).reply(400);
			await store.dispatch(checkAuthStatus());

			expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe(null);
		});
	});

	describe('authorize', () => {
		it('should dispatch "authorize.pending" and "authorize.fulfilled" on success', async () => {
			const mockRequest = { email: 'test@test.com', password: 'password123' };
			const mockResponse = {
				name: 'Test User',
				avatarUrl: 'https://url-to-image/image.png',
				isPro: false,
				email: 'test@test.com',
				token: 'TestToken'
			};

			mockAxiosAdapter.onPost(Paths.Login).reply(200, mockResponse);

			await store.dispatch(authorize(mockRequest));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.AUTHORIZE}/pending`,
				`${Actions.AUTHORIZE}/fulfilled`
			]);

			const fulfilledAction = store.getActions().find(
				(action) => action.type === `${Actions.AUTHORIZE}/fulfilled`
			) as AuthorizeFulfilledAction;

			expect(fulfilledAction?.payload).toEqual(mockResponse);
			expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toEqual(mockResponse.token);
		});

		it('should dispatch "authorize.pending" and "authorize.rejected" on failure', async () => {
			const mockRequest = { email: 'test@test.com', password: 'p' };

			mockAxiosAdapter.onPost(Paths.Login).reply(400, {
				errorType: 'VALIDATION_ERROR',
				message: 'Validation error: /six-cities/login',
				details: [
					{
						property: 'password',
						value: 'p',
						messages: [
							'password must be longer than or equal to 3 characters'
						]
					}
				]
			});

			await store.dispatch(authorize(mockRequest));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.AUTHORIZE}/pending`,
				`${Actions.AUTHORIZE}/rejected`
			]);

			const rejectAction = store.getActions().find(
				(action) => action.type === `${Actions.AUTHORIZE}/rejected`
			) as AuthorizeRejectedAction;

			expect(rejectAction?.payload.message).toBe('Validation error: /six-cities/login');
			expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe(null);
		});
	});

	describe('logout', () => {
		it('should dispatch "logout.pending" and "logout.fulfilled" on success', async () => {
			localStorage.setItem(TOKEN_STORAGE_KEY, 'TestToken');

			mockAxiosAdapter.onDelete(Paths.Logout).reply(204);

			await store.dispatch(logout());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.LOGOUT}/pending`,
				`${Actions.LOGOUT}/fulfilled`
			]);

			expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe(null);
		});

		it('should dispatch "logout.pending" and "logout.rejected" on failure', async () => {
			localStorage.setItem(TOKEN_STORAGE_KEY, 'TestToken');

			mockAxiosAdapter.onDelete(Paths.Logout).reply(500);

			await store.dispatch(logout());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				`${Actions.LOGOUT}/pending`,
				`${Actions.LOGOUT}/rejected`
			]);

			expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe('TestToken');
		});
	});
});
