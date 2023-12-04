/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ReactComponent as BounceDarkLogo } from '../../assets/imgs/bounce/logo-white.svg'
import { ReactComponent as BounceLogo } from '../../assets/imgs/bounce/logo.svg'
import { useMediaQuery, useTheme } from '@mui/material'
import { ReactComponent as KravDarkLogo } from '../../assets/imgs/tokens/karv_icon_dark.svg'
import { ReactComponent as KravLogo } from '../../assets/imgs/tokens/karv_icon.svg'
// import { ReactComponent as Twitter } from '../../assets/imgs/twitter.svg'
// import { ReactComponent as Medium } from '../../assets/imgs/medium.svg'
// import TelegramIcon from '@mui/icons-material/Telegram'

export const Copyright = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <div
      css={css`
        margin: ${isMobile ? '0 16px' : ''};
      `}
    >
      {theme.palette.mode === 'dark' ? (
        <BounceDarkLogo
          height="29"
          width="139"
          css={css`
            margin-top: ${isMobile ? '48px' : '27px'};
            margin-bottom: ${isMobile ? '64px' : 0};
            margin-right: -4px;
          `}
        />
      ) : (
        <BounceLogo
          height="29"
          width="139"
          css={css`
            margin-top: ${isMobile ? '48px' : '27px'};
            margin-bottom: ${isMobile ? '64px' : 0};
            margin-right: -4px;
          `}
        />
      )}

      <div className="social">
        {/*<Discord*/}
        {/*  height="24"*/}
        {/*  width="24"*/}
        {/*  css={css`*/}
        {/*    padding: 2px;*/}
        {/*    margin-right: 16px;*/}
        {/*  `}*/}
        {/*/>*/}
        {/*<Link underline="none" sx={{ color: theme.text.primary }} href="https://twitter.com/kravtrade">*/}
        {/*  <Twitter*/}
        {/*    height="24"*/}
        {/*    width="24"*/}
        {/*    css={css`*/}
        {/*      padding: 2px;*/}
        {/*      margin-right: 16px;*/}
        {/*    `}*/}
        {/*  />*/}
        {/*</Link>*/}
        {/*<Link underline="none" sx={{ color: theme.text.primary }} href="https://medium.com/kravtrade">*/}
        {/*  <Medium*/}
        {/*    className="medium"*/}
        {/*    height="24"*/}
        {/*    width="24"*/}
        {/*    css={css`*/}
        {/*      margin-right: 16px;*/}
        {/*    `}*/}
        {/*  />*/}
        {/*</Link>*/}
        {/*<Link underline="none" sx={{ color: theme.text.primary }} href="https://t.me/kravtrade">*/}
        {/*  <TelegramIcon*/}
        {/*    className="medium"*/}
        {/*    height="24"*/}
        {/*    width="24"*/}
        {/*    sx={{ color: '#757575' }}*/}
        {/*    css={css`*/}
        {/*      margin-right: 16px;*/}
        {/*    `}*/}
        {/*  />*/}
        {/*</Link>*/}

        {/*<Github height="24" width="24" />*/}
        <div
          css={css`
            color: ${theme.text.primary};
            display: flex;
            align-items: center;
            padding-bottom: ${isMobile ? '24px' : '0'};
          `}
        >
          <span>Powered by KRAV &nbsp;</span>
          {theme.palette.mode === 'dark' ? (
            <KravDarkLogo height="14" width="14" />
          ) : (
            <KravLogo height="14" width="14" />
          )}
        </div>
      </div>
    </div>
  )
}
