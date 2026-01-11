import {RootState} from '@/app/store.ts';
import {TodolistType} from '@/common/commontypes.ts';

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists