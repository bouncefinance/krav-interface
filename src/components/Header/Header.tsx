/** @jsxImportSource @emotion/react */
import { useMediaQuery, useTheme } from '@mui/material'
import { header, UnSupport } from './sytle'
import { align } from '../../globalStyle'
import { ReactComponent as DogLogo } from '../../assets/imgs/bounce/dog.svg'
// import { ReactComponent as BounceDarkLogo } from '../../assets/imgs/bounce/logo-white.svg'
// import { ReactComponent as BounceLogo } from '../../assets/imgs/bounce/logo.svg'
// import { ReactComponent as KravLogo } from '../../assets/imgs/tokens/karv_icon.svg'
// import { ReactComponent as KravDarkLogo } from '../../assets/imgs/tokens/karv_icon_dark.svg'
import { css } from '@emotion/react'
import { ConnectWalletDialog } from '../../components/Dialog/ConnectWallet'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useRootStore } from '../../store/root'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { eXDecimals } from '../../utils/math'
import { useSetThemeContext } from '../../theme/appTheme'
import DehazeIcon from '@mui/icons-material/Dehaze'
import { NavMenu } from './mobile/NavMenu'
import { WalletButton } from './WalletButton'
import { useInterval } from '../../hook/hookV8/useInterval'
import { getAddChainParameters } from '../../connectors/chain'
import { DEFAULT_CHAIN, SUPPORT_CHAIN } from '../../constant/chain'
import { FaucetDialog } from '../Dialog/FaucetDialog'
import { useFactory } from '../../hook/hookV8/useFactory'
import { MenuSelector } from './MenuSelector'

export const Header = () => {
  const setWalletDialogVisibility = useRootStore((store) => store.setWalletDialogVisibility)
  const walletDialogVisibility = useRootStore((store) => store.walletDialogVisibility)
  const { account, chainId, connector, provider } = useWeb3React()
  const [ethBalance, setEthBalance] = useState(new BigNumber(0))
  const [openMobileNav, setOpenMobileNav] = useState(false)
  const [openFa, setOpenFa] = useState(false)
  const [autoConnect, setAutoConnect] = useState(true)
  const factory = useFactory()

  const disconnectWallet = useRootStore((store) => store.disconnectWallet)
  const setDisconnectWallet = useRootStore((store) => store.setDisconnectWallet)
  const expectChainId = useRootStore((store) => store.expectChainId)
  const isLoadingFactory = useRootStore((store) => store.isLoadingFactory)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const toggleTheme = useSetThemeContext()

  // const isHomePath = useMemo(() => {
  //   const pathList = ['/portfolio', '/portfolio/stake', '/portfolio/farm', '/portfolio/referral', '/portfolio/reward']
  //   return pathList.includes(pathname)
  // }, [pathname])

  useEffect(() => {
    setTimeout(async () => {
      const id = localStorage.getItem('krav-chain-id')
      if (!account && !disconnectWallet && autoConnect) {
        try {
          await connector.activate()
          setDisconnectWallet(true)
          setAutoConnect(false)
        } catch (e: any) {
          if (e.code === 4001) return
          try {
            await connector.activate(getAddChainParameters(Number(id) ? Number(id) : expectChainId))
            setAutoConnect(false)
          } catch (e) {}
        } finally {
          if (!isLoadingFactory) factory().then(() => {})
        }
      }
    }, 200)
  }, [account, chainId, disconnectWallet])

  const getUserBalance = useCallback(async () => {
    if (account && provider) {
      provider.getBalance(account).then((res) => {
        setEthBalance(eXDecimals(res._hex, 18))
      })
    } else return
  }, [account, provider])

  useEffect(() => {
    getUserBalance().then()
  }, [account, provider])

  useInterval(getUserBalance, 15000)

  return (
    <>
      <NavMenu isOpen={openMobileNav} setIsOpen={() => setOpenMobileNav(false)} />
      <FaucetDialog isOpen={openFa} setIsOpen={setOpenFa} />
      <header
        css={[
          header,
          css`
            background: #000;
            z-index: 1;
            position: relative;
          `,
        ]}
      >
        <div css={align}>
          <div>
            <div
              css={[
                align,
                css`
                  margin-right: ${isMobile ? '0' : '73px'};
                `,
              ]}
            >
              <NavLink style={{ height: '32px' }} to={'/trade'}>
                {theme.palette.mode === 'dark' ? (
                  <DogLogo height="32" width="32" />
                ) : (
                  <DogLogo height="32" width="32" />
                )}
              </NavLink>
              <span
                css={css`
                  font-weight: 600;
                  color: #fff;
                  margin-left: 8px;
                  size: 22px;
                `}
              >
                Broccoli
              </span>
            </div>
            {/*<div>*/}
            {/*  <Link underline="none" href="https://app.krav.trade" target="_blank">*/}
            {/*    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 12, color: theme.text.primary }}>*/}
            {/*      Powered by KRAV &nbsp;*/}
            {/*      {theme.palette.mode === 'dark' ? (*/}
            {/*        <KravDarkLogo height="14" width="14" />*/}
            {/*      ) : (*/}
            {/*        <KravLogo height="14" width="14" />*/}
            {/*      )}*/}
            {/*    </Box>*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
        </div>
        <div
          css={css`
            height: 100%;
          `}
        >
          {/* {!isMobile && (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                '& a:hover': {
                  // background: 'none',
                  // boxShadow: 'none',
                  color: '#757575',
                },
                // '& a.active:hover': {
                //   background: '#000000',
                //   color: '#fff',
                //   boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                // },
              }}
            >
              <NavLink to={'/trade'} css={[router, routerColor, isTradePath ? routerActive : '']}>
                <Trans>Trade</Trans>
              </NavLink>
              <NavLink to={'/liquidity'} css={[router, routerColor, pathname === '/liquidity' ? routerActive : '']}>
                <Trans>Liquidity</Trans>
              </NavLink>
              {/*<NavLink to={'/portfolio'} css={[router, routerColor, isHomePath ? routerActive : '']}>*/}
          {/*  <Trans>Portfolio</Trans>*/}
          {/*</NavLink>*/}
          {/*<NavLink to={'/statistics'} css={[router, routerColor, pathname === '/statistics' ? routerActive : '']}>*/}
          {/*  <Trans>Statistics</Trans>*/}
          {/*</NavLink>*/}
          {/* </Box> */}
          {/* )} */}
        </div>
        <div css={align}>
          <MenuSelector />
          <WalletButton
            chainId={chainId}
            connector={connector}
            ethBalance={ethBalance}
            toggleTheme={toggleTheme}
            account={account}
            setOpenFaucet={() => setOpenFa(true)}
          />
          {isMobile && <DehazeIcon onClick={() => setOpenMobileNav(true)} height="24" width="24" />}
        </div>
        <ConnectWalletDialog
          walletDialogVisibility={walletDialogVisibility}
          setWalletDialogVisibility={setWalletDialogVisibility}
        />
      </header>
      {chainId && !SUPPORT_CHAIN.includes(chainId) && account && (
        <div css={UnSupport}>
          Unsupported network! &nbsp;
          <span
            onClick={async () => {
              try {
                await connector.activate(DEFAULT_CHAIN)
              } catch (e: any) {
                if (e.code === 4001) return
                await connector.activate(getAddChainParameters(DEFAULT_CHAIN))
              }
            }}
          >
            Please change network.
          </span>
        </div>
      )}
    </>
  )
}
