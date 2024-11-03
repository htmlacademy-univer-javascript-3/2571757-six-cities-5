import { Offer } from '../../types/offer.ts';
import { OfferCard } from '../offer-card';
import { FavoriteCard } from '../favorite-card';

type Props = {
	offers: Offer[];
	favorites?: boolean;
	onOfferHover?: (id?: Offer['id']) => void;
};

export const OffersList = ({ offers, favorites, onOfferHover }: Props) => {
	return (
		<div className={favorites ? 'favorites__places' : 'cities__places-list places__list tabs__content'}>
			{offers.length && offers.map((offer) => {
				return favorites ?
					<FavoriteCard key={offer.id} {...offer} /> :
					<OfferCard key={offer.id} {...offer} onHover={onOfferHover} />;
			})}
		</div>
	);
};
