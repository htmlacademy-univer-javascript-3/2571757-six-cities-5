import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { LoginPage } from '../pages/login-page';
import { FavoritesPage } from '../pages/favorites-page';
import { OfferPage } from '../pages/offer-page';
import { PrivateRoute } from '../shared/routes/private-route';
import { Page404 } from '../pages/errors';
import { AppRoutes } from './routes';

const OFFERS_AMOUNT = 555;

export const App = () => (
	<BrowserRouter>
		<Routes>

			<Route path={AppRoutes.Default}>
				<Route index element={<MainPage offersAmount={OFFERS_AMOUNT} />} />
				<Route path={AppRoutes.Login} element={<LoginPage />} />
				<Route path={AppRoutes.Favorites} element={(
					<PrivateRoute isAuthenticated={false}>
						<FavoritesPage />
					</PrivateRoute>
				)}
				/>
				<Route path={AppRoutes.Offer} element={<OfferPage />} />
			</Route>
			<Route path='*' element={<Page404 />} />
		</Routes>
	</BrowserRouter>
);
