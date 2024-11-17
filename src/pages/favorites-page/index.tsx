import { useEffect, useMemo } from 'react';
import { Offer } from '../../types/offer.ts';
import { Header, OffersList, Spinner } from '../../components';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { selectFavoriteOffersReducerData } from '../../store/selectors.ts';

export const FavoritesPage = () => {
	const { favoritesOffers, loading } = useAppSelector(selectFavoriteOffersReducerData);
	const { fetchFavoritesOffers } = useActions();

	const offersSplittedByCity = useMemo(() => {
		return favoritesOffers.reduce((acc, currOffer) => {
			if (!acc[currOffer.city.name]) {
				acc[currOffer.city.name] = [];
			}
			acc[currOffer.city.name].push(currOffer);
			return acc;
		}, {} as Record<Offer['city']['name'], Offer[]>);
	}, [favoritesOffers]);

	useEffect(() => {
		fetchFavoritesOffers();
	}, [fetchFavoritesOffers]);

	return (
		<div className="page">
			<Header />

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
									{loading ? (
										<Spinner size='l' />
									) : (
										<OffersList offers={offersForCity} type='favorites' />
									)}
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
