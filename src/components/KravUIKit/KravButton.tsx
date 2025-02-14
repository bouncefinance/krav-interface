import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const KRAVButton = styled(Button)(({ theme }) => ({
  whiteSpace: 'nowrap',
  textTransform: 'none',
  width: '100%',
  fontFamily: 'Inter',
  color: '#121212',
  background: '#E1F25C',
  borderRadius: '100px',
  padding: '10px 16px',
  height: '40px',
  fontSize: '14px',
  '&:hover': {
    opacity: 0.8,
    background: '#E1F25C',
  },
  // '&:active': {
  //   background: '#000000',
  // },
  '&.Mui-disabled': {
    background: theme.button.disableBg,
    color: theme.button.disableText,
    cursor: 'not-allowed',
    pointerEvents: 'auto',
  },
  '& .MuiTouchRipple-root': {
    color: 'white',
  },
}))

export default KRAVButton
