import { useMatch } from 'react-router-dom';
import { AppRoutes } from '../../../constants/routes';

type PageSettings = {
	hasFooter: boolean;
	hasHeader: boolean;
	isLightHeader: boolean;
	pageContainerClassName: string;
};

const pageContainerClasses = {
	[AppRoutes.Default]: 'page--gray page--main',
	[AppRoutes.Login]: 'page--gray page--login',
	[AppRoutes.Favorites]: 'page--favorites-empty'
};

export const usePageSettings = (): PageSettings => {
	const isMainPage = useMatch(AppRoutes.Default)?.pathname === AppRoutes.Default;
	const isFavoritesPage = useMatch(AppRoutes.Favorites)?.pathname === AppRoutes.Favorites;
	const isSigninPage = useMatch(AppRoutes.Login)?.pathname === AppRoutes.Login;

	let pageContainerClassName = '';

	if (isMainPage) {
		pageContainerClassName = pageContainerClasses[AppRoutes.Default];
	} else if (isSigninPage) {
		pageContainerClassName = pageContainerClasses[AppRoutes.Login];
	} else if (isFavoritesPage) {
		pageContainerClassName = pageContainerClasses[AppRoutes.Favorites];
	}

	return {
		hasFooter: isFavoritesPage,
		hasHeader: true,
		isLightHeader: isSigninPage,
		pageContainerClassName
	};
};
