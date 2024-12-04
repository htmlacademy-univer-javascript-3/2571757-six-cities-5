import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorize, checkAuthStatus, logout } from '../action';
import { UserData } from '../../types/user';
import { AuthorizationStatus } from '../../types/auth';
import { ErrorResponse, RequestStatus } from '../types';

type AuthState = {
    authorizationStatus: AuthorizationStatus;
	authorizeStatus: RequestStatus;
	logoutStatus: RequestStatus;
	checkAuthStatus: RequestStatus;
    userData: Partial<UserData> | null;
}

const initialState: AuthState = {
	authorizationStatus: AuthorizationStatus.Unauthorized,
	userData: null,
	checkAuthStatus: {
		loading: false
	},
	authorizeStatus: {
		loading: false,
		error: null
	},
	logoutStatus: {
		loading: false
	}
};

const setValidationErrors = (details: ErrorResponse['details']): Record<string, string> | undefined => {
	return details?.reduce((errors, { property, messages }) => {
		(errors as { [key: string]: string })[property] = messages[0][0].toUpperCase() + messages[0].slice(1);
		return errors;
	}, {});
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// checkAuthStatus
			.addCase(checkAuthStatus.pending, (state) => {
				state.checkAuthStatus.loading = true;
			})
			.addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
				state.authorizationStatus = AuthorizationStatus.Authorized;
				state.userData = payload;
				state.checkAuthStatus.loading = false;
			})
			.addCase(checkAuthStatus.rejected, (state) => {
				state.checkAuthStatus.loading = false;
			})

			// authorize
			.addCase(authorize.pending, (state) => {
				state.authorizeStatus.loading = true;
				state.authorizeStatus.error = null;
			})
			.addCase(authorize.fulfilled, (state, { payload }) => {
				state.authorizationStatus = AuthorizationStatus.Authorized;
				state.userData = payload;
				state.authorizeStatus.loading = false;
				state.authorizeStatus.error = null;
			})
			.addCase(authorize.rejected, (state, { payload }: PayloadAction<ErrorResponse | undefined>) => {
				state.authorizeStatus.loading = false;

				const validationErrors = payload?.details ? setValidationErrors(payload?.details) : undefined;

				state.authorizeStatus.validationErrors = validationErrors;
				state.authorizeStatus.error = payload?.message;
			})

			// logout
			.addCase(logout.pending, (state) => {
				state.logoutStatus.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.Unauthorized;
				state.logoutStatus.loading = false;
			})
			.addCase(logout.rejected, (state, { payload }: PayloadAction<ErrorResponse | undefined>) => {
				state.logoutStatus.loading = false;
				state.logoutStatus.error = payload?.message;
			});
	}
});

export const { reducer: authReducer } = authSlice;
