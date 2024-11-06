import type { Offer, OfferPreviewType } from '../../types/offer.ts';
import { OfferCard } from '../offer-card';

type Props = {
	offers: Offer[];
	type: OfferPreviewType;
	onOfferHover?: (id?: Offer['id']) => void;
};

export const OffersList = ({ offers, type = 'default', onOfferHover }: Props) => {
	const calculateClassName = (listType: OfferPreviewType) => {
		switch (listType) {
			case 'favorites':
				return 'favorites__places';
			case 'nearest':
				return 'near-places__list places__list';
			default:
				return 'cities__places-list places__list tabs__content';
		}
	};

	return (
		<div className={calculateClassName(type)}>
			{offers.length && offers.map((offer) => {
				return <OfferCard key={offer.id} previewType={type} {...offer} onHover={onOfferHover} />;
			})}
		</div>
	);
};
