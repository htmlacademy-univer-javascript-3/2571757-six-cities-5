import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page';
import { LoginPage } from '../../pages/login-page';
import { FavoritesPage } from '../../pages/favorites-page';
import { OfferPage } from '../../pages/offer-page';
import { PrivateRoute } from '../../components/private-route';
import { Page404 } from '../../pages/errors';
import { AppRoutes } from '../../constants/routes.ts';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { Layout } from '../../components/layout/index.tsx';
import { selectAuthReducerData } from '../../store/selectors.ts';
import { AuthorizationStatus } from '../../types/auth.ts';

export const Router = () => {
	const { checkAuthStatus, fetchFavoritesOffers } = useActions();
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	useEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	useEffect(() => {
		if (authorizationStatus === AuthorizationStatus.Authorized) {
			fetchFavoritesOffers();
		}
	}, [authorizationStatus, fetchFavoritesOffers]);


	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.Default} element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path={AppRoutes.Login} element={<LoginPage />} />
					<Route path={AppRoutes.Favorites} element={(
						<PrivateRoute>
							<FavoritesPage />
						</PrivateRoute>
					)}
					/>
					<Route path={AppRoutes.OfferForRouter} element={<OfferPage />} />
				</Route>
				<Route path='*' element={<Page404 />} />
			</Routes>
		</BrowserRouter>
	);
};
