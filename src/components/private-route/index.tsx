import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { selectAuthReducerData } from '../../store/selectors.ts';
import { getToken } from '../../store/utils/index.ts';
import { AuthorizationStatus } from '../../types/auth.ts';

type Props = {
	children: ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
	const storagedToken = getToken();
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	const isUserAuthorized = authorizationStatus === AuthorizationStatus.Authorized || storagedToken;

	return isUserAuthorized ? children : <Navigate to={AppRoutes.Login} replace />;
};
