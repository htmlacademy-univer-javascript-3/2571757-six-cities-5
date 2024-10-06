import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { LoginPage } from '../pages/login-page';
import { FavoritesPage } from '../pages/favorites-page';
import { OfferPage } from '../pages/offer-page';
import { PrivateRoute } from '../shared/routes/private-route';
import { Page404 } from '../pages/errors';

const OFFERS_AMOUNT = 555;

export const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/'>
				<Route index element={<MainPage offersAmount={OFFERS_AMOUNT} />} />
				<Route path='login' element={<LoginPage />} />
				<Route path='favorites' element={(
					<PrivateRoute isAuthenticated={false}>
						<FavoritesPage />
					</PrivateRoute>
				)}
				/>
				<Route path='offer/:id' element={<OfferPage />} />
			</Route>
			<Route path='*' element={<Page404 />} />
		</Routes>
	</BrowserRouter>
);
