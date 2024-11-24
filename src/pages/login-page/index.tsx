import { useEffect } from 'react';
import { SignInForm } from '../../components';
import { useActions, useAppSelector } from '../../store/hooks';
import { selectAuthReducerData } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import { AuthorizationStatus } from '../../types/auth';
import { generateRandomCity } from '../../utils/generage-random-city';
import styles from './styles.module.css';

export const LoginPage = () => {
	const { changeCity } = useActions();
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);
	const navigate = useNavigate();

	const randomCity = generateRandomCity();

	useEffect(() => {
		if (authorizationStatus === AuthorizationStatus.Authorized) {
			navigate(AppRoutes.Default);
		}
	}, [navigate, authorizationStatus]);

	const handleCityLinkClick = () => {
		changeCity(randomCity);
		navigate(AppRoutes.Default);
	};

	return (
		<main className="page__main page__main--login">
			<div className="page__login-container container">
				<section className="login">
					<h1 className="login__title">Sign in</h1>
					<SignInForm />
				</section>
				<section className="locations locations--login locations--current">
					<div className={`locations__item locations__item-link ${styles.link}`} onClick={handleCityLinkClick}>
						<span>{randomCity}</span>
					</div>
				</section>
			</div >
		</main >
	);
};
