import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import { useActions, useAppSelector } from '../../store/hooks';
import { selectAuthReducerData, selectFavoriteOffersReducerData } from '../../store/selectors';
import { AuthorizationStatus } from '../../types/auth';
import styles from './styles.module.css';

type Props = {
	withNav?: boolean;
};

export const Header = ({ withNav = true }: Props) => {
	const { authorizationStatus, userData } = useAppSelector(selectAuthReducerData);
	const { favoritesOffers } = useAppSelector(selectFavoriteOffersReducerData);
	const { logout } = useActions();

	const handleLogoutButtonClick = () => {
		logout();
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link className="header__logo-link header__logo-link--active" to={AppRoutes.Default}>
							<img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
						</Link>
					</div>
					{withNav && (
						<nav className="header__nav">
							<ul className="header__nav-list">
								{authorizationStatus === AuthorizationStatus.Authorized ? (
									<>
										<li className="header__nav-item user">
											<Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
												<div className="header__avatar-wrapper user__avatar-wrapper">
													{userData.avatarUrl && <img className="header__avatar user__avatar" src={userData.avatarUrl} width="54" height="54" alt="User avatar" />}
												</div>
												{userData.email && <span className="header__user-name user__name">{userData.email}</span>}
												<span className="header__favorite-count">{favoritesOffers.length}</span>
											</Link>
										</li>
										<li className={`${styles.signout} header__nav-item header__nav-link`} onClick={handleLogoutButtonClick}>
											<span className="header__signout">Sign out</span>
										</li>
									</>
								) : (
									<li className="header__nav-item">
										<Link className="header__nav-link" to={AppRoutes.Login}>
											<span className="header__signout">Sign in</span>
										</Link>
									</li>
								)}
							</ul>
						</nav>
					)}
				</div>
			</div>
		</header >
	);
};
