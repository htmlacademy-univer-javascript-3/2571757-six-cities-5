import { ReactNode } from 'react';
import { Header } from '../header';

type Props = {
	children: ReactNode;
	className?: string;
	lightHeader?: boolean;
	hasFooter?: boolean;
};

export const PageWrapper = ({ children, className, lightHeader, hasFooter }: Props) => {
	return (
		<div className={`page ${className}`}>
			<Header withNav={!lightHeader} />

			{children}

			{hasFooter && (
				<footer className="footer container">
					<a className="footer__logo-link" href="main.html">
						<img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
					</a>
				</footer>
			)}
		</div>
	);
};
