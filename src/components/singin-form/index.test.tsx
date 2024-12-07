import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SignInForm } from './index';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../types/auth';

const mockStore = configureMockStore();
const mockAuthorize = vi.fn();

vi.mock('../../store/hooks', () => ({
	useActions: () => ({
		authorize: mockAuthorize
	}),
	useAppSelector: vi.fn(() => ({
		authorizeStatus: {
			loading: false,
			validationErrors: null
		}
	}))
}));

describe('Component: SignInForm', () => {
	const title = 'Sign in';

	const renderSignInForm = (
		loading = false,
		validationErrors: { email: string; password: string } | undefined | null = null
	) => {
		const store = mockStore({
			auth: {
				authorizationStatus: AuthorizationStatus.Unauthorized,
				authorizeStatus: {
					loading: loading,
					error: null,
					validationErrors: validationErrors
				}
			}
		});

		render(
			<Provider store={store}>
				<SignInForm title={title} />
			</Provider>
		);
	};

	it('should handle input changes', () => {
		renderSignInForm();

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');

		fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });

		expect(emailInput).toHaveValue('test@test.com');
		expect(passwordInput).toHaveValue('password123');
	});

	it('should disable submit button when inputs are empty', () => {
		renderSignInForm();

		const submitButton = screen.getByRole('button');
		expect(submitButton).toBeDisabled();
	});

	it('should enable submit button when both inputs have values', () => {
		renderSignInForm();

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const submitButton = screen.getByRole('button');

		fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });

		expect(submitButton).not.toBeDisabled();
	});

	it('should call authorize on form submit', () => {
		renderSignInForm();

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const form = screen.getByRole('form');

		fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });
		fireEvent.submit(form);

		expect(mockAuthorize).toHaveBeenCalledWith({
			email: 'test@test.com',
			password: 'password123'
		});
	});
});
