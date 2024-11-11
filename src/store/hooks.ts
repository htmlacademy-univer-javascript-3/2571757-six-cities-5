import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './types';
import * as actions from './action';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const reduxActions = {
	...actions
};

export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(() => {
		return bindActionCreators(reduxActions, dispatch);
	}, [dispatch]);
};
