import { render, screen } from '@testing-library/react';
import { Spinner } from './';
import styles from './styles.module.css';

vi.mock('./constants', () => ({
	mapSizeIntoRingStyles: {
		s: { width: '20px', height: '20px' },
		m: { width: '40px', height: '40px' },
		l: { width: '60px', height: '60px' }
	},
	mapSizeIntoRingDivStyles: {
		s: { border: '2px solid red' },
		m: { border: '3px solid green' },
		l: { border: '4px solid blue' }
	}
}));

describe('Spinner', () => {
	it('should render with default props', () => {
		render(<Spinner />);

		const spinner = screen.getByRole('presentation');
		expect(spinner).toHaveStyle({ width: '40px', height: '40px' });
	});

	it('should render with correct size "s"', () => {
		render(<Spinner size="s" />);

		const spinner = screen.getByRole('presentation');
		expect(spinner).toHaveStyle({ width: '20px', height: '20px' });
	});

	it('should render with correct size "l"', () => {
		render(<Spinner size="l" />);

		const spinner = screen.getByRole('presentation');
		expect(spinner).toHaveStyle({ width: '60px', height: '60px' });
	});


	it('should render with correct type "inline"', () => {
		render(<Spinner type="inline" />);

		const spinner = screen.getByRole('presentation');
		expect(spinner.parentElement).not.toHaveClass(styles.spinnerContainer);
	});

	it('should render with correct type "block"', () => {
		render(<Spinner type="block" />);

		const spinner = screen.getByRole('presentation');
		expect(spinner.parentElement).toHaveClass(styles.spinnerContainer);
	});
});
