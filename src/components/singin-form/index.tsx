import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SignInFormState } from './types';
import { useActions, useAppSelector } from '../../store/hooks';
import { selectAuthReducerData } from '../../store/selectors';
import { Spinner } from '../spinner';
import styles from './styles.module.css';

export const SignInForm = () => {
	const { authorizeStatus: { loading, error, validationErrors } } = useAppSelector(selectAuthReducerData);
	const { authorize } = useActions();
	const [formData, setFormData] = useState<SignInFormState>({
		email: '',
		password: ''
	});

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = evt.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (formData.email && formData.password) {
			authorize(formData);
		}
	};

	const isSubmitDisabled = !formData.email || !formData.password;

	return (
		<form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">E-mail</label>
				<input className="login__input form__input" type="email" name="email" placeholder="Email" required={false} onChange={handleFieldChange} />
				{validationErrors?.email && <p className={styles.error}>{validationErrors?.email}</p>}
			</div>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">Password</label>
				<input className="login__input form__input" type="password" name="password" placeholder="Password" required={false} onChange={handleFieldChange} />
				{validationErrors?.password && <p className={styles.error}>{validationErrors?.password}</p>}
			</div>
			<button className="login__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
				{loading ? (
					<Spinner size='s' type='inline' preset='white' />
				) : (
					'Sign in'
				)}
			</button>
		</form>
	);
};
