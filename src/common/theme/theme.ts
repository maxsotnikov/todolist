import {createTheme} from '@mui/material';
import {ThemeMode} from '../commontypes.ts';

export const getTheme = (themeMode: ThemeMode) => createTheme({
  palette: {
    primary: {
      main: '#425363',
    },
    secondary: {
      main: '#E1E4E3',
    },
    info: {
      main: '#A90101',
      contrastText: '#ffffff'
    },
    mode: themeMode
  }
})