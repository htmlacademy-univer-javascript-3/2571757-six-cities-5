import { useMemo, useState } from 'react';
import type { Offer } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { useAppSelector } from '../../store/hooks';
import { getCitySelector } from '../../store/selectors';

type Props = {
	offers: Offer[];
};

export const CityOffers = ({ offers }: Props) => {
	const [hoveredOfferId, setHoveredOfferId] = useState<Offer['id'] | undefined>(undefined);
	const cityName = useAppSelector(getCitySelector);
	const offersAmount = offers.length;

	const handleOfferHover = (id: Offer['id'] | undefined) => {
		setHoveredOfferId(id);
	};

	const hoveredOffer = useMemo(() => {
		return offers.find((offer) => offer.id === hoveredOfferId);
	}, [hoveredOfferId, offers]);

	if (!offers.length) {
		return <div>Offers loading...</div>;
	}

	return (
		<div className="cities">
			<div className="cities__places-container container">
				<section className="cities__places places">
					<h2 className="visually-hidden">Places</h2>
					<b className="places__found">{offersAmount} places to stay in {cityName}</b>
					<form className="places__sorting" action="#" method="get">
						<span className="places__sorting-caption">Sort by</span>
						<span className="places__sorting-type" tabIndex={0}>
							Popular
							<svg className="places__sorting-arrow" width="7" height="4">
								<use xlinkHref="#icon-arrow-select"></use>
							</svg>
						</span>
						<ul className="places__options places__options--custom places__options--opened">
							<li className="places__option places__option--active" tabIndex={0}>Popular</li>
							<li className="places__option" tabIndex={0}>Price: low to high</li>
							<li className="places__option" tabIndex={0}>Price: high to low</li>
							<li className="places__option" tabIndex={0}>Top rated first</li>
						</ul>
					</form>
					<OffersList offers={offers} onOfferHover={handleOfferHover} type='default' />
				</section>
				<div className="cities__right-section">
					<section className="cities__map">
						<Map offers={offers} activeCityName={cityName} selectedOffer={hoveredOffer} />
					</section>
				</div>
			</div>
		</div>
	);
};
