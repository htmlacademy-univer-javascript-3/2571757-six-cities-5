import { createReducer } from '@reduxjs/toolkit';
import { authorize, checkAuthStatus, logout } from '../action';
import { UserData } from '../../types/user';
import { AuthorizationStatus, ValidationErrorDto } from '../../types/auth';

type ValidationErrorData = Record<string, string>;

interface AuthState {
    loading: boolean;
    authorizationStatus: AuthorizationStatus;
    validationErrors?: ValidationErrorData;
    userData: Partial<UserData>;
}

const initialState: AuthState = {
	authorizationStatus: AuthorizationStatus.Unauthorized,
	loading: false,
	validationErrors: undefined,
	userData: {}
};

const setValidationErrors = (data: ValidationErrorDto): ValidationErrorData => {
	return data.details.reduce((errors, { property, messages }) => {
		errors[property] = messages[0][0].toUpperCase() + messages[0].slice(1);
		return errors;
	}, {} as ValidationErrorData);
};

const authReducer = createReducer(initialState, (builder) => {
	builder
		// checkAuthStatus
		.addCase(checkAuthStatus.pending, (state) => {
			state.loading = true;
		})
		.addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
			state.authorizationStatus = AuthorizationStatus.Authorized;
			state.userData = payload;
			state.loading = false;
		})
		.addCase(checkAuthStatus.rejected, (state) => {
			state.loading = false;
		})

		// authorize
		.addCase(authorize.pending, (state) => {
			state.loading = true;
			state.validationErrors = undefined;
		})
		.addCase(authorize.fulfilled, (state, { payload }) => {
			state.authorizationStatus = AuthorizationStatus.Authorized;
			state.userData = payload;
			state.loading = false;
		})
		.addCase(authorize.rejected, (state, { payload }) => {
			state.loading = false;
			state.validationErrors =
                payload?.response?.data ? setValidationErrors(payload.response.data) : undefined;
		})

		// logout
		.addCase(logout.pending, (state) => {
			state.loading = true;
		})
		.addCase(logout.fulfilled, (state) => {
			state.authorizationStatus = AuthorizationStatus.Unauthorized;
			state.loading = false;
		})
		.addCase(logout.rejected, (state) => {
			state.loading = false;
		});
});

export default authReducer;
