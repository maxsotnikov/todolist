import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
  background?: string
  txtColor?: string
}

export const NavButton = styled(Button)<Props>(({ background, txtColor, theme }) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  margin: '0 10px',
  padding: '8px 24px',
  color: txtColor || '#000000',
  background: background || theme.palette.secondary.light,
}))