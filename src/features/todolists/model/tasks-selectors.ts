import {RootState} from '@/app/store.ts';
import {TasksStateType} from '@/common/commontypes.ts';

export const selectTasks = (state: RootState): TasksStateType => state.tasks