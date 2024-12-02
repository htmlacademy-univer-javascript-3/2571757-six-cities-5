import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../../components';
import { useActions, useAppSelector } from '../../store/hooks';
import { selectAuthReducerData } from '../../store/selectors';
import { AppRoutes } from '../../constants/routes';
import { AuthorizationStatus } from '../../types/auth';
import { generateRandomCity } from '../../utils/generage-random-city';
import { useErrorHandling } from '../../hooks/use-error-handling';
import styles from './styles.module.css';

const LoginPage = () => {
	const { changeCity } = useActions();
	const { authorizationStatus, authorizeStatus: { error } } = useAppSelector(selectAuthReducerData);
	const navigate = useNavigate();

	const randomCity = generateRandomCity();

	useEffect(() => {
		if (authorizationStatus === AuthorizationStatus.Authorized) {
			navigate(-1);
		}
	}, [navigate, authorizationStatus]);

	useErrorHandling(error);

	const handleCityLinkClick = () => {
		changeCity(randomCity);
		navigate(AppRoutes.Default);
	};

	return (
		<main className="page__main page__main--login">
			<div className="page__login-container container">
				<section className="login">
					<SignInForm title='Sign in' />
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

export default LoginPage;
