import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { selectAuthReducerData } from '../../store/selectors.ts';

type Props = {
	children: ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	return authorizationStatus === 'authorized' ? children : <Navigate to={AppRoutes.Login} replace />;
};
