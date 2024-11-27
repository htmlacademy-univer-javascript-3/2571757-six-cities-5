import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from '../header';
import { Footer } from '../footer';
import { usePageSettings } from './hooks/use-page-settings';

const toastOptions = {
	duration: 5000,
	error: {
		style: {
			backgroundColor: '#ff4053',
			color: 'white'
		}
	}
};

export const Layout = () => {
	const {
		hasHeader,
		hasFooter,
		isLightHeader,
		pageContainerClassName
	} = usePageSettings();

	return (
		<div className={`page ${pageContainerClassName}`}>
			{hasHeader && <Header withNav={!isLightHeader} />}
			<Outlet />
			{hasFooter && <Footer />}
			<Toaster position='bottom-center' toastOptions={toastOptions} />
		</div>
	);
};
