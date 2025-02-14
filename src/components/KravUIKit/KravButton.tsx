import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const KRAVButton = styled(Button)(({ theme }) => ({
  whiteSpace: 'nowrap',
  textTransform: 'none',
  width: '100%',
  fontFamily: 'Work Sans',
  color: '#1C1C19',
  background: '#E1F25C',
  borderRadius: '100px',
  padding: '12px 24px',
  height: '40px',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: 1.4,
  '&:hover': {
    background: '#E1F25C',
    opacity: 0.8,
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
