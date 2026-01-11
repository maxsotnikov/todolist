import {RootState} from '@/app/store.ts';
import {ThemeMode} from '@/common/commontypes.ts';

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode