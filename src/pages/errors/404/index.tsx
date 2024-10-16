import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export const Page404 = () => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate('/', { replace: true });
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>Page Not Found</h1>
			<p className={styles.description}>Sorry we find no one page with this path, return to the main page</p>
			<button className={styles.backButton} onClick={handleButtonClick}>Go to main page</button>
		</div>
	);
};
