import { Cities } from '../../types/cities';
import styles from './styles.module.css';

type Props = {
	name: Cities;
	isActive: boolean;
	onChange: (city: Cities) => void;
};

export const CityTab = ({ name, isActive, onChange }: Props) => {
	const handleTabClick = () => {
		onChange(name);
	};

	return (
		<li className="locations__item">
			<div className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''} ${styles.tab}`} onClick={handleTabClick}>
				<span>{name}</span>
			</div>
		</li>
	);
};
