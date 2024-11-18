import { useEffect } from 'react';
import { OffersList, Map, Spinner } from '../../../../components';
import { useActions, useAppSelector } from '../../../../store/hooks';
import { selectCityName, selectNearestOffersReducerData } from '../../../../store/selectors';
import { OfferInfo } from '../../../../types/offer-info';

type Props = {
	offerInfo?: OfferInfo;
};

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

	return (
		<>
			<section className="offer__map">
				<Map offers={nearestOffers} activeCityName={cityName} width='100%' selectedOffer={offerInfo} />
			</section>
			<div className="container">
				<section className="near-places places">
					<h2 className="near-places__title">Other places in the neighbourhood</h2>
					<OffersList offers={nearestOffers.slice(0, 3)} type='nearest' />
				</section>
			</div>
		</>
	);
};
