import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { Layout } from './';
import { usePageSettings } from '../../hooks/use-page-settings';

// Мокируем хук usePageSettings
vi.mock('../../hooks/use-page-settings', () => ({
	usePageSettings: vi.fn()
}));

vi.mock('react-router-dom', () => ({
	Outlet: () => <div data-testid="outlet" />
}));

vi.mock('react-hot-toast', () => ({
	Toaster: () => <div data-testid="toaster" />
}));

vi.mock('../header', () => ({
	Header: () => <div data-testid="header" />
}));

vi.mock('../footer', () => ({
	Footer: () => <div data-testid="footer" />
}));

describe('Layout', () => {
	it('рендерит Header, Outlet и Footer при наличии hasHeader и hasFooter', () => {
		(usePageSettings as Mock).mockReturnValue({
			hasHeader: true,
			hasFooter: true,
			isLightHeader: false,
			pageContainerClassName: 'test-container'
		});

		render(<Layout />);

		expect(screen.getByTestId('header')).toBeInTheDocument();
		expect(screen.getByTestId('outlet')).toBeInTheDocument();
		expect(screen.getByTestId('footer')).toBeInTheDocument();
		expect(screen.getByTestId('toaster')).toBeInTheDocument();
	});

	it('не рендерит Header при hasHeader=false', () => {
		(usePageSettings as Mock).mockReturnValue({
			hasHeader: false,
			hasFooter: true,
			isLightHeader: false,
			pageContainerClassName: ''
		});

		render(<Layout />);

		expect(screen.queryByTestId('header')).not.toBeInTheDocument();
		expect(screen.getByTestId('footer')).toBeInTheDocument();
		expect(screen.getByTestId('outlet')).toBeInTheDocument();
		expect(screen.getByTestId('toaster')).toBeInTheDocument();
	});

	it('не рендерит Footer при hasFooter=false', () => {
		(usePageSettings as Mock).mockReturnValue({
			hasHeader: true,
			hasFooter: false,
			isLightHeader: true,
			pageContainerClassName: 'light-page'
		});

		render(<Layout />);

		expect(screen.getByTestId('header')).toBeInTheDocument();
		expect(screen.getByTestId('outlet')).toBeInTheDocument();
		expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
	});
});
