import { useEffect } from 'react';
import { OffersList, Map, Spinner } from '../../../../components';
import { useActions, useAppSelector } from '../../../../store/hooks';
import { selectCityName, selectNearestOffersReducerData } from '../../../../store/selectors';
import { OfferInfo } from '../../../../types/offer-info';
import { mapOfferInfoIntoOffer } from '../../helpers';

type Props = {
	offerInfo?: OfferInfo;
};

const MAX_NEARBY_OFFERS_AMOUNT = 3;
const MAX_PINS_AMOUNT = 4;

export const NearestOffers = ({ offerInfo }: Props) => {
	const { nearestOffers, loading } = useAppSelector(selectNearestOffersReducerData);
	const { fetchNearestOffers } = useActions();
	const cityName = useAppSelector(selectCityName);

	useEffect(() => {
		if (!offerInfo?.id) {
			return;
		}

		fetchNearestOffers({ offerId: offerInfo.id });
	}, [offerInfo?.id, fetchNearestOffers]);

	if (!nearestOffers || loading) {
		return <Spinner size='l' />;
	}

	const nearestOffersWithCurrent = [
		...(offerInfo ? [mapOfferInfoIntoOffer(offerInfo)] : []),
		...nearestOffers
	];

	return (
		<>
			<section className="offer__map">
				<Map offers={nearestOffersWithCurrent.slice(0, MAX_PINS_AMOUNT)} activeCityName={cityName} width='100%' selectedOffer={offerInfo} />
			</section>
			<div className="container">
				<section className="near-places places">
					<h2 className="near-places__title">Other places in the neighbourhood</h2>
					<OffersList offers={nearestOffers.slice(0, MAX_NEARBY_OFFERS_AMOUNT)} type='nearest' />
				</section>
			</div>
		</>
	);
};
