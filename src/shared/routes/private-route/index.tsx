import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/routes';

type Props = {
	isAuthenticated: boolean;
	children: ReactNode;
}

export const PrivateRoute = ({ isAuthenticated, children }: Props) => {
	return isAuthenticated ? children : <Navigate to={AppRoutes.Login} replace />;
};
