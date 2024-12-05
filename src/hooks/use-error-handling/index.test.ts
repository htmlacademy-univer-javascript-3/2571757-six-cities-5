import { renderHook } from '@testing-library/react';
import { useErrorHandling } from './';
import toast from 'react-hot-toast';

describe('useErrorHandling', () => {
	const toastErrorSpy = vi.spyOn(toast, 'error');

	afterEach(() => {
		toastErrorSpy.mockRestore();
	});

	it('should call toast.error with error message', () => {
		const error = 'Test error';
		const callback = vi.fn();

		renderHook(() => useErrorHandling(error, callback));

		expect(toastErrorSpy).toHaveBeenCalledWith(error);
	});

	it('should call callback function when error is passed', () => {
		const error = 'Test error';
		const callback = vi.fn();

		renderHook(() => useErrorHandling(error, callback));

		expect(callback).toHaveBeenCalled();
	});

	it('should not call toast.error when error is not passed', () => {
		const callback = vi.fn();

		renderHook(() => useErrorHandling(null, callback));

		expect(toastErrorSpy).not.toHaveBeenCalled();
	});

	it('should not call callback when error is not passed', () => {
		const callback = vi.fn();

		renderHook(() => useErrorHandling(null, callback));

		expect(callback).not.toHaveBeenCalled();
	});
});
