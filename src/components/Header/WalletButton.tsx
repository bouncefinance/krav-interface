/** @jsxImportSource @emotion/react */
import { align } from '../../globalStyle'
import { NetWorkButton } from './NetworkButton'
import KRAVButton from '../KravUIKit/KravButton'
import { headerBtn, setting } from './sytle'
import { Menu, useMediaQuery, useTheme } from '@mui/material'
import { SettingMenuContent } from './SettingMenuContent'
import { Trans } from '@lingui/macro'
import React, { useCallback, useMemo, useState } from 'react'
import { Connector } from '@web3-react/types'
import { useRootStore } from '../../store/root'
import BigNumber from 'bignumber.js'
import copy from 'copy-to-clipboard'
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined'
import { ChainId } from '../../constant/chain'

type WalletButtonProps = {
  account: string | undefined
  chainId: number | undefined
  ethBalance: BigNumber
  toggleTheme: () => void
  connector: Connector
  setOpenFaucet: () => void
}

export const WalletButton = ({
  account,
  connector,
  chainId,
  ethBalance,
  toggleTheme,
  setOpenFaucet,
}: WalletButtonProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [settingAnchorEl, setSettingAnchorEl] = useState<null | HTMLElement>(null)
  const [openTooltip, setOpenTooltip] = useState(false)
  const setDisconnectWallet = useRootStore((store) => store.setDisconnectWallet)
  const setWalletDialogVisibility = useRootStore((store) => store.setWalletDialogVisibility)
  const settingOpen = useMemo(() => {
    return Boolean(settingAnchorEl)
  }, [settingAnchorEl])
  const handleSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingAnchorEl(event.currentTarget)
  }
  const handleSettingClose = () => {
    setSettingAnchorEl(null)
  }
  const useCopyAddress = useCallback(async () => {
    try {
      if (account) {
        await navigator.clipboard.writeText(account)
        setOpenTooltip(true)
        setTimeout(() => {
          setOpenTooltip(false)
          setSettingAnchorEl(null)
        }, 3000)
      }
    } catch (e) {
      copy(account ? account : 'please connect wallet')
      setTimeout(() => {
        setOpenTooltip(false)
        setSettingAnchorEl(null)
      }, 3000)
    }
  }, [account])

  const disconnect = useCallback(async () => {
    if (connector) {
      if (connector && connector.deactivate) {
        connector.deactivate()
      }
      connector.resetState()
      setDisconnectWallet(true)
    }
  }, [connector])

  const showFaucet = useMemo(() => {
    if (chainId) {
      if (
        [
          ChainId.MUMBAI_TEST,
          ChainId.ARB_TEST,
          ChainId.BSC_TEST,
          ChainId.OP_GOERLI,
          ChainId.POLYGON_ZKEVM_TEST,
        ].includes(chainId)
      )
        return true
      else return false
    } else return false
  }, [chainId])

  return (
    <div css={align}>
      <NetWorkButton />
      {account && showFaucet && (
        <KRAVButton onClick={setOpenFaucet}>
          <InvertColorsOutlinedIcon />
          Faucet
        </KRAVButton>
      )}
      {account ? (
        <div css={align}>
          <KRAVButton
            sx={{
              width: 'auto',
              mx: '9px',
              borderRadius: '200px',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            css={headerBtn}
            id="setting-button"
            aria-controls={settingOpen ? 'setting-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={settingOpen ? 'true' : undefined}
            onClick={handleSettingClick}
          >
            {account.substr(0, 4)}
            ...
            {account.substr(account.length - 2, 2)}
          </KRAVButton>
          <Menu
            css={setting}
            sx={{
              '& .MuiPaper-root': {
                minWidth: isMobile ? 200 : 440,
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)',
              },
              '& .MuiMenu-list': {
                padding: 0,
              },
            }}
            id="setting-menu"
            anchorEl={settingAnchorEl}
            open={settingOpen}
            onClose={handleSettingClose}
            MenuListProps={{
              'aria-labelledby': 'setting-button',
            }}
          >
            <SettingMenuContent
              account={account}
              chainId={chainId}
              disconnect={disconnect}
              ethBalance={ethBalance}
              handleSettingClose={handleSettingClose}
              openTooltip={openTooltip}
              toggleTheme={toggleTheme}
              useCopyAddress={useCopyAddress}
            />
          </Menu>
        </div>
      ) : (
        <KRAVButton
          sx={{
            mx: '9px',
            borderRadius: '200px',
            textTransform: 'none',
          }}
          css={headerBtn}
          onClick={() => setWalletDialogVisibility(true)}
        >
          <Trans>Connect Wallet</Trans>
        </KRAVButton>
      )}
      {/*<div css={notifyBtn}>*/}
      {/*  <Notify />*/}
      {/*</div>*/}
    </div>
  )
}
