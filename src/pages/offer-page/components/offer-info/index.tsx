import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Spinner, FeedbackBlock } from '../../../../components';
import { calculateRatingWidth } from '../../../../utils/calculate-rating-width';
import { capitalize } from '../../../../utils/capitalize';
import { OfferInfo as OfferInfoType } from '../../../../types/offer-info';
import { pluralize } from '../../helpers';
import { OfferRequestStatus } from '../../../../types/offer';
import { useActions, useAppSelector } from '../../../../store/hooks';
import { selectAuthReducerData, selectFavoriteOffersReducerData } from '../../../../store/selectors';
import { AuthorizationStatus } from '../../../../types/auth';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../constants/routes';

const MAX_PREVIEW_IMAGES_AMOUNT = 6;

type Props = {
	loading: boolean;
	offerInfo?: OfferInfoType;
}


export const OfferInfo = ({ offerInfo, loading }: Props) => {
	const navigate = useNavigate();
	const { changeFavoriteStatus } = useActions();
	const { postStatus: { loading: changeFavoriteStatusLoading, error } } = useAppSelector(selectFavoriteOffersReducerData);
	const { authorizationStatus } = useAppSelector(selectAuthReducerData);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	if (!offerInfo || loading) {
		return <Spinner size='l' />;
	}

	const handleFavoriteButtonClick = () => {
		if (authorizationStatus === AuthorizationStatus.Unauthorized) {
			navigate(AppRoutes.Login);
			return;
		}

		const requestStatus = offerInfo.isFavorite ? OfferRequestStatus.Remove : OfferRequestStatus.Add;

		changeFavoriteStatus({ offerId: offerInfo.id, status: requestStatus });
	};

	return (
		<section className="offer">
			<div className="offer__gallery-container container">
				<div className="offer__gallery">
					{offerInfo.images.slice(0, MAX_PREVIEW_IMAGES_AMOUNT).map((image) => (
						<div key={image} className="offer__image-wrapper">
							<img className="offer__image" src={image} alt="Offer Photo" />
						</div>
					))}
				</div>
			</div>
			<div className="offer__container container">
				<div className="offer__wrapper">
					{offerInfo.isPremium && (
						<div className="offer__mark">
							<span>Premium</span>
						</div>
					)}
					<div className="offer__name-wrapper">
						<h1 className="offer__name">
							{offerInfo.title}
						</h1>
						<button
							className={`offer__bookmark-button button ${offerInfo.isFavorite && 'offer__bookmark-button--active'}`}
							type="button"
							disabled={changeFavoriteStatusLoading}
							onClick={handleFavoriteButtonClick}
						>
							<svg className="offer__bookmark-icon" width="31" height="33">
								<use xlinkHref="#icon-bookmark"></use>
							</svg>
							<span className="visually-hidden">To bookmarks</span>
						</button>
					</div>
					<div className="offer__rating rating">
						<div className="offer__stars rating__stars">
							<span style={{ width: calculateRatingWidth(offerInfo.rating) }}></span>
							<span className="visually-hidden">Rating</span>
						</div>
						<span className="offer__rating-value rating__value">{offerInfo.rating}</span>
					</div>
					<ul className="offer__features">
						<li className="offer__feature offer__feature--entire">
							{capitalize(offerInfo.type)}
						</li>
						<li className="offer__feature offer__feature--bedrooms">
							{pluralize(offerInfo.bedrooms, ['Bedroom', 'Bedrooms'])}
						</li>
						<li className="offer__feature offer__feature--adults">
							Max {pluralize(offerInfo.maxAdults, ['adult', 'adults'])}
						</li>
					</ul>
					<div className="offer__price">
						<b className="offer__price-value">&euro;{offerInfo.price}</b>
						<span className="offer__price-text">&nbsp;night</span>
					</div>
					<div className="offer__inside">
						<h2 className="offer__inside-title">What&apos;s inside</h2>
						<ul className="offer__inside-list">
							{offerInfo.goods.map((good) => (
								<li key={good} className="offer__inside-item">
									{good}
								</li>
							))}
						</ul>
					</div>
					<div className="offer__host">
						<h2 className="offer__host-title">Meet the host</h2>
						<div className="offer__host-user user">
							<div
								className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper"
							>
								<img className="offer__avatar user__avatar" src={offerInfo.host.avatarUrl} width="74" height="74" alt="Host avatar" />
							</div>
							<span className="offer__user-name">
								{offerInfo.host.name}
							</span>
							<span className="offer__user-status">
								{offerInfo.host.isPro ? 'Pro' : 'Default'}
							</span>
						</div>
						<div className="offer__description">
							<p className="offer__text">
								{offerInfo.description}
							</p>
						</div>
					</div>
					<FeedbackBlock offerId={offerInfo.id} />
				</div>
			</div>
		</section>
	);
};
