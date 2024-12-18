import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import styles from './styles.module.css';

const Page404 = () => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate(AppRoutes.Default, { replace: true });
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>Page Not Found</h1>
			<p className={styles.description}>Sorry we find no one page with this path, return to the main page</p>
			<button className={styles.backButton} onClick={handleButtonClick}>Go to main page</button>
		</div>
	);
};

export default Page404;
