import { Link } from 'react-router-dom';
import { CityOffers } from '../../components';
import { AppRoutes } from '../../constants/routes.ts';
import type { Offer } from '../../types/offer.ts';
import { Tabs } from '../../components';

type Props = {
	offers: Offer[];
};

const CITIES_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const MainPage = ({ offers }: Props) => {
	return (
		<div className="page page--gray page--main">
			<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<a className="header__logo-link header__logo-link--active">
								<img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
							</a>
						</div>
						<nav className="header__nav">
							<ul className="header__nav-list">
								<li className="header__nav-item user">
									<Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
										<div className="header__avatar-wrapper user__avatar-wrapper">
										</div>
										<span className="header__user-name user__name">Oliver.conner@gmail.com</span>
										<span className="header__favorite-count">3</span>
									</Link>
								</li>
								<li className="header__nav-item">
									<a className="header__nav-link" href="#">
										<span className="header__signout">Sign out</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>

			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<Tabs citiesNames={CITIES_NAMES} />
				<CityOffers offers={offers} />
			</main>
		</div>
	);
};

