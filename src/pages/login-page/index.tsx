import { useEffect } from 'react';
import { Header } from '../../components';
import { SignInForm } from '../../components';
import { useAppSelector } from '../../store/hooks';
import { selectAuthReducerData } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';

export const LoginPage = () => {
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);
	const navigate = useNavigate();

	useEffect(() => {
		if (authorizationStatus === 'authorized') {
			navigate(AppRoutes.Default);
		}
	}, [navigate, authorizationStatus]);

	return (
		<div className="page page--gray page--login">
			<Header withNav={false} />

			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<SignInForm />
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							<a className="locations__item-link" href="#">
								<span>Amsterdam</span>
							</a>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};
