import styles from './styles.module.css';

import { mapSizeIntoRingDivStyles, mapSizeIntoRingStyles } from './constants';

type Props = {
	size?: 's' | 'm' | 'l';
	type?: 'block' | 'inline';
	preset?: 'white' | 'black';
};

export const Spinner = ({ size = 'm', type = 'block', preset = 'black' }: Props) => {
	const spinner = (
		<div data-testid='spinner' role='presentation' className={styles.ring} style={{ ...mapSizeIntoRingStyles[size], color: preset }}>
			<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
			<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
			<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
			<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
		</div>
	);

	return type === 'block' ? (
		<div className={styles.spinnerContainer}>
			{spinner}
		</div>
	) : spinner;
};
