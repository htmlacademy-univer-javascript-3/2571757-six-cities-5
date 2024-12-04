import { memo } from 'react';
import type { Offer, OfferPreviewType } from '../../types/offer.ts';
import { OfferCard } from '../offer-card';
import { calculateClassName } from './utils/index.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { selectFavoriteOffersReducerData } from '../../store/selectors.ts';
import { useErrorHandling } from '../../hooks/use-error-handling.ts';

type Props = {
	offers: Offer[];
	type: OfferPreviewType;
	onOfferHover?: (id?: Offer['id']) => void;
};

export const OffersList = memo(({ offers, type = 'default', onOfferHover }: Props) => {
	const {
		postStatus: { error }
	} = useAppSelector(selectFavoriteOffersReducerData);

	useErrorHandling(error);

	return (
		<div className={calculateClassName(type)}>
			{offers.length && offers.map((offer) => {
				return <OfferCard key={offer.id} previewType={type} offer={offer} onHover={onOfferHover} />;
			})}
		</div >
	);
});

OffersList.displayName = 'OffersList';
