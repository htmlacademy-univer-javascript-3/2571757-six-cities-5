import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useErrorHandling = (error?: string | null, callback?: VoidFunction) => {
	useEffect(() => {
		if (error) {
			toast.error(error);
			callback?.();
		}
	}, [error, callback]);
};
