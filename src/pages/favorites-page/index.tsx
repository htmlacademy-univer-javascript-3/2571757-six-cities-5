import { useEffect, useMemo } from 'react';
import { Offer } from '../../types/offer.ts';
import { OffersList } from '../../components';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { getFavoritesOffersSelector } from '../../store/selectors.ts';

export const FavoritesPage = () => {
	const offers = useAppSelector(getFavoritesOffersSelector);
	const { getFavoritesOffers } = useActions();

	const offersSplittedByCity = useMemo(() => {
		return offers.reduce((acc, currOffer) => {
			if (!acc[currOffer.city.name]) {
				acc[currOffer.city.name] = [];
			}
			acc[currOffer.city.name].push(currOffer);
			return acc;
		}, {} as Record<Offer['city']['name'], Offer[]>);
	}, [offers]);

	useEffect(() => {
		getFavoritesOffers();
	}, [getFavoritesOffers]);

	return (
		<div className="page">
			<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<a className="header__logo-link" href="main.html">
								<img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
							</a>
						</div>
						<nav className="header__nav">
							<ul className="header__nav-list">
								<li className="header__nav-item user">
									<a className="header__nav-link header__nav-link--profile" href="#">
										<div className="header__avatar-wrapper user__avatar-wrapper">
										</div>
										<span className="header__user-name user__name">Oliver.conner@gmail.com</span>
										<span className="header__favorite-count">3</span>
									</a>
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

			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{Object.keys(offersSplittedByCity).length && Object.entries(offersSplittedByCity).map(([cityName, offersForCity]) => (
								<li className="favorites__locations-items" key={cityName}>
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<a className="locations__item-link" href="#">
												<span>{cityName}</span>
											</a>
										</div>
									</div>
									{offers && <OffersList offers={offersForCity} type='favorites' />}
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
			<footer className="footer container">
				<a className="footer__logo-link" href="main.html">
					<img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
				</a>
			</footer>
		</div>
	);
};
