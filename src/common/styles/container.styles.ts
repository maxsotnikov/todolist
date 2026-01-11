import {SxProps} from '@mui/material';

export const container: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
  opacity: isDone ? 0.5 : 1,
  textDecoration: isDone ? 'line-through' : 'none',
})