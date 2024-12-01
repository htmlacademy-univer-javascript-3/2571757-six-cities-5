import { useCallback, useMemo, useState } from 'react';
import type { Offer } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { useAppSelector } from '../../store/hooks';
import { selectCityName } from '../../store/selectors';
import { SortForm } from '../sort-form';
import { NoOffersSlug } from './components/no-offers-slug';

type Props = {
	offers: Offer[];
};

export const CityOffers = ({ offers }: Props) => {
	const [hoveredOfferId, setHoveredOfferId] = useState<Offer['id'] | undefined>(undefined);
	const cityName = useAppSelector(selectCityName);
	const offersAmount = offers.length;
	const isOffersListEmpty = offersAmount === 0;

	const handleOfferHover = useCallback((id: Offer['id'] | undefined) => {
		setHoveredOfferId(id);
	}, []);

	const hoveredOffer = useMemo(() => offers.find((offer) => offer.id === hoveredOfferId), [offers, hoveredOfferId]);

	return (
		<div className="cities">
			<div className={`cities__places-container container ${isOffersListEmpty && 'cities__places-container--empty'}`}>
				{isOffersListEmpty ? (
					<NoOffersSlug />
				) : (
					<section className="cities__places places">
						<h2 className="visually-hidden">Places</h2>
						<b className="places__found">{offersAmount} places to stay in {cityName}</b>
						<SortForm />
						{offers.length && <OffersList offers={offers} type='default' onOfferHover={handleOfferHover} />}
					</section>
				)}
				<div className="cities__right-section">
					<section className="cities__map">
						{offers.length && <Map offers={offers} activeCityName={cityName} selectedOffer={hoveredOffer} />}
					</section>
				</div>
			</div>
		</div>
	);
};
