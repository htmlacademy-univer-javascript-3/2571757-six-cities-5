import { ErrorInfo, PureComponent, ReactNode } from 'react';

type Props = {
	FallbackComponent?: ReactNode;
	children: ReactNode;
}

type State = {
	hasError: boolean;
}

export class ErrorBoundary extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// eslint-disable-next-line no-console
		console.error('ErrorBoundary поймал ошибку: ', error, errorInfo);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			const ErrorComponent = this.props.FallbackComponent ?? <h1>Something went wrong.</h1>;
			return ErrorComponent;
		}

		return this.props.children;
	}
}
