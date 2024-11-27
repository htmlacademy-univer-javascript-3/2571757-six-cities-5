import { TOKEN_STORAGE_KEY } from '../../constants/storage';

export const saveToken = (token: string): void => localStorage.setItem(TOKEN_STORAGE_KEY, token);
export const removeToken = (): void => localStorage.removeItem(TOKEN_STORAGE_KEY);
export const getToken = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);

export const handleTokenInLocalStorage = (token?: string) => {
	const storedToken = getToken();

	if (!storedToken && token || token && storedToken && storedToken !== token) {
		try {
			saveToken(token);
		} catch (error) {
			throw new Error('Can not set token in local storage');
		}
	}
};
