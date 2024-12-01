import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NearestOffers } from './components/nearest-offers/index.tsx';
import { OfferInfo } from './components/offer-info/index.tsx';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { selectAuthReducerData, selectOfferInfoReducerData } from '../../store/selectors.ts';
import { AppRoutes } from '../../constants/routes.ts';

const OfferPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { fetchOfferInfo } = useActions();
	const { offerInfo, loading, error } = useAppSelector(selectOfferInfoReducerData);
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	useEffect(() => {
		if (!id) {
			return;
		}

		fetchOfferInfo({ offerId: id });
	}, [fetchOfferInfo, id, authorizationStatus]);

	if (error) {
		navigate(AppRoutes.NotFound);
	}

	return (
		<main className="page__main page__main--offer">
			<OfferInfo offerInfo={offerInfo} loading={loading} />
			<NearestOffers offerInfo={offerInfo} />
		</main>
	);
};

export default OfferPage;
