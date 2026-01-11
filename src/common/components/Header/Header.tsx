import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import {NavButton} from '@/common/components/NavButton/NavButton.ts';
import Switch from '@mui/material/Switch';
import {changeThemeModeAC} from '@/app/app-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectThemeMode} from '@/app/app-selectors.ts';
import {getTheme} from '@/common/theme/theme.ts';
import {container} from '@/common/styles/container.styles.ts';

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    const action = changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'})
    dispatch(action)
  }

  return (
    <AppBar position="static">
      <Toolbar sx={container}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Box>
          <NavButton>Sign in</NavButton>
          <NavButton>Sign out</NavButton>
          <NavButton
            background={theme.palette.info.main}
            txtColor={theme.palette.info.contrastText}
          >
            FAQ
          </NavButton>
          <Switch onChange={changeMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};