import { useActions, useAppSelector } from '../../store/hooks';
import { CityTab } from '../city-tab';
import { selectCityName } from '../../store/selectors';
import type { Cities } from '../../types/cities';

type Props = {
	citiesNames: Cities[];
};

// eslint-disable-next-line
export const CitiesList = ({ citiesNames }: Props) => {
	const city = useAppSelector(selectCityName);
	const { changeCity } = useActions();

	const handleCityChange = (cityName: Cities) => {
		changeCity(cityName);
	};

	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{citiesNames && citiesNames.map((name) => {
						const isActive = name === city;

						return <CityTab key={name} name={name} isActive={isActive} onChange={handleCityChange} />;
					})}
				</ul>
			</section>
		</div>
	);
};
