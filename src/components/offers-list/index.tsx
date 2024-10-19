import { useCallback, useState } from 'react';
import { Offer } from '../../types/offer.ts';
import { OfferCard } from '../offer-card';
import { FavoriteCard } from '../favorite-card';

type Props = {
	offers: Offer[];
	favorites?: boolean;
};

export const OffersList = ({ offers, favorites }: Props) => {
	const [activeCardId, setActiveCardId] = useState<Offer['id'] | undefined>(undefined);

	// eslint-disable-next-line no-console
	console.log('activeCardId: ', activeCardId);

	const handleCardSetActiveStatus = useCallback((id: Offer['id'] | undefined) => {
		setActiveCardId(id);
	}, []);

	return (
		<div className={favorites ? 'favorites__places' : 'cities__places-list places__list tabs__content'}>
			{offers.length ? offers.map((offer) => {
				const { id } = offer;

				// TODO: Объединить карточки в один компонент
				return favorites ?
					<FavoriteCard key={id} {...offer} /> :
					<OfferCard key={id} {...offer} onHover={handleCardSetActiveStatus} />;
			}) : null}
		</div>
	);
};
