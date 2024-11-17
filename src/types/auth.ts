import { UserData } from './user';

export type AuthorizationRequestDto = {
	email: string;
	password: string;
};

export type AuthorizationResponseDto = UserData;

export type ValidationErrorDetails = {
	property: string;
	value: string;
	messages: string[];
}

export type ValidationErrorDto = {
	errorType: string;
	message: string;
	details: ValidationErrorDetails[];
  };
