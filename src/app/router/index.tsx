import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page';
import { LoginPage } from '../../pages/login-page';
import { FavoritesPage } from '../../pages/favorites-page';
import { OfferPage } from '../../pages/offer-page';
import { PrivateRoute } from '../../components/private-route';
import { Page404 } from '../../pages/errors';
import { AppRoutes } from '../../constants/routes.ts';

export const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path={AppRoutes.Default}>
				<Route index element={<MainPage />} />
				<Route path={AppRoutes.Login} element={<LoginPage />} />
				<Route path={AppRoutes.Favorites} element={(
					<PrivateRoute isAuthenticated>
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