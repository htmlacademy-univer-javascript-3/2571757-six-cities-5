import { Link, useNavigate } from 'react-router-dom';
import { OfferRequestStatus, type Offer, type OfferPreviewType } from '../../types/offer.ts';
import { AppRoutes } from '../../constants/routes.ts';
import { calculateRatingWidth } from '../../utils/calculate-rating-width.ts';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { selectAuthReducerData, selectFavoriteOffersReducerData } from '../../store/selectors.ts';
import { AuthorizationStatus } from '../../types/auth.ts';

type Props = {
	offer: Offer;
	previewType: OfferPreviewType;
	onHover?: (id: Offer['id'] | undefined) => void;
};

export const OfferCard = ({ offer, previewType, onHover }: Props) => {
	const {
		id,
		price,
		title,
		previewImage,
		type,
		rating,
		isPremium,
		isFavorite
	} = offer;

	const navigate = useNavigate();
	const { changeFavoriteStatus } = useActions();
	const { postStatus: { loading } } = useAppSelector(selectFavoriteOffersReducerData);
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	const isFavoriteOfferType = previewType === 'favorites';

	const calculateClassName = () => {
		const classMap = {
			favorites: 'favorites',
			nearest: 'near-places',
			default: 'cities'
		};
		return classMap[previewType] || classMap.default;
	};

	const handleFavoriteButtonClick = () => {
		if (authorizationStatus === AuthorizationStatus.Unauthorized) {
			navigate(AppRoutes.Login);
			return;
		}

		changeFavoriteStatus({ offerId: id, status: isFavorite ? OfferRequestStatus.Remove : OfferRequestStatus.Add });
	};

	return (
		<article className={`${calculateClassName()}__card place-card`}
			onMouseEnter={() => onHover?.(id)}
			onMouseLeave={() => onHover?.(undefined)}
		>

			{previewType === 'default' && isPremium && (
				<div className={`${calculateClassName()}__mark`}>
					<div className="place-card__mark">
						<span>Premium</span>
					</div>
				</div>
			)}

			<div className={`${calculateClassName()}__image-wrapper place-card__image-wrapper`}>
				<Link to={`${AppRoutes.Offer}/${id}`} replace={previewType === 'nearest'}>
					<img
						className="place-card__image"
						src={previewImage}
						width={isFavoriteOfferType ? '150' : '260'}
						height={isFavoriteOfferType ? '110' : '200'}
						alt={`${title} place image`}
					/>
				</Link>
			</div>

			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">&euro;{price}</b>
						<span className="place-card__price-text">&#47;&nbsp;night</span>
					</div>
					<button
						disabled={loading}
						className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
						type="button"
						onClick={handleFavoriteButtonClick}
					>
						<svg className="place-card__bookmark-icon" width="18" height="19">
							<use xlinkHref="#icon-bookmark"></use>
						</svg>
						<span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: calculateRatingWidth(rating) }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`${AppRoutes.Offer}/${id}`} replace={previewType === 'nearest'}>{title}</Link>
				</h2>
				<p className="place-card__type">{type}</p>
			</div>
		</article>
	);
};
