import { Provider } from 'react-redux';
import { Router } from './router';
import { store } from '../store';
import { ErrorBoundary } from '../components';

export const App = () => (
	<Provider store={store}>
		<ErrorBoundary>
			<Router />
		</ErrorBoundary>
	</Provider>
);
