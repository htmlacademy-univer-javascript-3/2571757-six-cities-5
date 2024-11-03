import { Link } from 'react-router-dom';

type Props = {
	name: string;
	isActive?: boolean;
};

// TODO: заменить ссылку
export const Tab = ({ name, isActive }: Props) => {
	// TODO: Забирать значение активного таба из стора или из роутера
	isActive = name === 'Amsterdam';

	return (
		<li className="locations__item">
			<Link className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to='#'>
				<span>{name}</span>
			</Link>
		</li>
	);
};
