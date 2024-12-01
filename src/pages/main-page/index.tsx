import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { CityOffers, Spinner } from '../../components';
import { CitiesList } from '../../components';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { selectAuthReducerData, selectCityName, selectFavoriteOffersReducerData, selectOffersReducerData } from '../../store/selectors.ts';
import { useSortedOffers } from '../../hooks/use-sorted-offers.ts';

const MainPage = () => {
	const { fetchOffers } = useActions();
	const cityName = useAppSelector(selectCityName);
	const { offers, loading } = useAppSelector(selectOffersReducerData);
	const { postStatus: { error } } = useAppSelector(selectFavoriteOffersReducerData);
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	useEffect(() => {
		fetchOffers();
	}, [fetchOffers, cityName, authorizationStatus]);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const sortedOffers = useSortedOffers(offers);

	return (
		<main className="page__main page__main--index">
			<h1 className="visually-hidden">Cities</h1>
			<CitiesList />
			{loading ? (
				<Spinner size='l' />
			) : (
				<CityOffers offers={sortedOffers} />
			)}
		</main>
	);
};

export default MainPage;
