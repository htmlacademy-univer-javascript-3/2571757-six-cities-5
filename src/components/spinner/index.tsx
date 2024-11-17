import styles from './styles.module.css';

import { mapSizeIntoRingDivStyles, mapSizeIntoRingStyles } from './constants';

type Props = {
	size?: 's' | 'm' | 'l';
};

export const Spinner = ({ size = 'm' }: Props) => {
	return (
		<div className={styles.spinnerContainer}>
			<div className={styles.ring} style={{ ...mapSizeIntoRingStyles[size] }}>
				<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
				<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
				<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
				<div style={{ ...mapSizeIntoRingDivStyles[size] }}></div>
			</div>
		</div>
	);
};
