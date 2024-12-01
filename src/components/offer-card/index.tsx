import { Link, useNavigate } from 'react-router-dom';
import { OfferRequestStatus, type Offer, type OfferPreviewType } from '../../types/offer.ts';
import { AppRoutes } from '../../constants/routes.ts';
import { calculateRatingWidth } from '../../utils/calculate-rating-width.ts';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { selectAuthReducerData, selectFavoriteOffersReducerData } from '../../store/selectors.ts';
import { AuthorizationStatus } from '../../types/auth.ts';

type Props = {
	previewType: OfferPreviewType;
	onHover?: (id: Offer['id'] | undefined) => void;
} & Offer;

export const OfferCard = (props: Props) => {
	const {
		id,
		price,
		title,
		previewImage,
		type,
		rating,
		previewType,
		isPremium,
		isFavorite,
		onHover
	} = props;
	const navigate = useNavigate();
	const isDefaultOfferType = previewType === 'default';
	const isNearestOfferType = previewType === 'nearest';
	const isFavoriteOfferType = previewType === 'favorites';
	const { changeFavoriteStatus } = useActions();
	const { postStatus: { loading } } = useAppSelector(selectFavoriteOffersReducerData);
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	const calculateClassName = (listType: OfferPreviewType) => {
		switch (listType) {
			case 'favorites':
				return 'favorites';
			case 'nearest':
				return 'near-places';
			default:
				return 'cities';
		}
	};

	const handleMouseEnter = () => {
		onHover?.(id);
	};

	const handleMouseLeave = () => {
		onHover?.(undefined);
	};

	const handleFavoriteButtonClick = () => {
		if (authorizationStatus === AuthorizationStatus.Unauthorized) {
			navigate(AppRoutes.Login);
			return;
		}

		const requestStatus = isFavorite ? OfferRequestStatus.Remove : OfferRequestStatus.Add;

		changeFavoriteStatus({ offerId: id, status: requestStatus });
	};

	return (
		<article className={`${calculateClassName(previewType)}__card place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			{isDefaultOfferType && (
				<div className={`${calculateClassName(previewType)}__mark`}>
					{isPremium && (
						<div className="place-card__mark">
							<span>Premium</span>
						</div>
					)}
				</div>
			)}
			<div className={`${calculateClassName(previewType)}__image-wrapper place-card__image-wrapper`}>
				<Link to={`${AppRoutes.Offer}/${id}`} replace={isNearestOfferType}>
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
						className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
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
					<Link to={`${AppRoutes.Offer}/${id}`} replace={isNearestOfferType}>{title}</Link>
				</h2>
				<p className="place-card__type">{type}</p>
			</div>
		</article>
	);
};
