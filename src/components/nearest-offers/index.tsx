import { useEffect } from 'react';
import { Spinner } from '../spinner';
import { Map } from '../map';
import { OffersList } from '../offers-list';
import { useActions, useAppSelector } from '../../store/hooks';
import { selectAuthReducerData, selectCityName, selectNearestOffersReducerData } from '../../store/selectors';
import { OfferInfo } from '../../types/offer-info';
import { useErrorHandling } from '../../hooks/use-error-handling';
import { convertOfferInfoToOffer } from '../../utils/convert-offer-info-into-offer';

type Props = {
	offerInfo?: OfferInfo;
};

const MAX_NEARBY_OFFERS_AMOUNT = 3;
const MAX_PINS_AMOUNT = 4;
const FIRST_ELEMENT_INDEX = 0;

export const NearestOffers = ({ offerInfo }: Props) => {
	const { nearestOffers, loading, error } = useAppSelector(selectNearestOffersReducerData);
	const { fetchNearestOffers } = useActions();
	const cityName = useAppSelector(selectCityName);
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	useErrorHandling(error);

	useEffect(() => {
		if (!offerInfo?.id) {
			return;
		}

		fetchNearestOffers({ offerId: offerInfo.id });
	}, [offerInfo?.id, fetchNearestOffers, authorizationStatus]);

	if (!nearestOffers) {
		return <h3>There is no nearest offers</h3>;
	}

	if (loading) {
		return <Spinner size='l' />;
	}

	const nearestOffersWithCurrent = [
		...(offerInfo ? [convertOfferInfoToOffer(offerInfo)] : []),
		...nearestOffers
	];

	return (
		<>
			<section className="offer__map">
				<Map offers={nearestOffersWithCurrent.slice(FIRST_ELEMENT_INDEX, MAX_PINS_AMOUNT)} activeCityName={cityName} width='100%' selectedOffer={offerInfo} />
			</section>
			<div className="container">
				<section className="near-places places">
					<h2 className="near-places__title">Other places in the neighbourhood</h2>
					<OffersList offers={nearestOffers.slice(FIRST_ELEMENT_INDEX, MAX_NEARBY_OFFERS_AMOUNT)} type='nearest' />
				</section>
			</div>
		</>
	);
};
