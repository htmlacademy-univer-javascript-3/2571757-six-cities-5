import { memo } from 'react';
import type { Offer, OfferPreviewType } from '../../types/offer.ts';
import { OfferCard } from '../offer-card';
import { calculateClassName } from './utils/index.ts';

type Props = {
	offers: Offer[];
	type: OfferPreviewType;
	onOfferHover?: (id?: Offer['id']) => void;
};

export const OffersList = memo(({ offers, type = 'default', onOfferHover }: Props) => {
	return (
		<div className={calculateClassName(type)}>
			{offers.length && offers.map((offer) => {
				return <OfferCard key={offer.id} previewType={type} {...offer} onHover={onOfferHover} />;
			})}
		</div >
	);
});

OffersList.displayName = 'OffersList';
