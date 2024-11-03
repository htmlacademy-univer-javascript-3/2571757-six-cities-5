import { Tab } from '../tab';

type Props = {
	activeCity?: string;
	citiesNames: string[];
};

// eslint-disable-next-line
export const Tabs = ({ citiesNames, activeCity }: Props) => {
	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{citiesNames && citiesNames.map((name) => {
						return <Tab key={name} name={name} />;
					})}
				</ul>
			</section>
		</div>
	);
};
