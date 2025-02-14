/** @jsxImportSource @emotion/react */
import { headerBtn } from './sytle'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import { ReactComponent as Base } from '../../assets/imgs/chain_base.svg'
import { ReactComponent as ARB } from '../../assets/imgs/arbitrum.svg'
import { ReactComponent as BSC } from '../../assets/imgs/bsc.svg'
import { ReactComponent as OP } from '../../assets/imgs/optimism.svg'
import { ReactComponent as Polygon } from '../../assets/imgs/polygon.svg'
import { ReactComponent as ZKEVM } from '../../assets/imgs/zkevm.svg'
import { Button, Menu, MenuItem, useTheme } from '@mui/material'
import { css } from '@emotion/react'
import { align } from '../../globalStyle'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import React, { useMemo, useState } from 'react'
import { ReactComponent as EthIcon } from '../../assets/imgs/tokens/Ehter.svg'
import { useWeb3React } from '@web3-react/core'
import { ChainId } from '../../constant/chain'
import { useConnect } from '../../hook/hookV8/useConnect'

const NetWorkerLogo = () => {
  const { chainId } = useWeb3React()
  switch (chainId) {
    case ChainId.MAINNET:
      return <EthIcon height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
    case ChainId.BSC:
      return <BSC height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
    case ChainId.OP:
      return <OP height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
    case ChainId.POLYGON:
      return <Polygon height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
    case ChainId.ARB:
      return <ARB height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
    case ChainId.POLYGON_ZK_EVM:
      return <ZKEVM height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
    default:
      return <BSC height="24" width="24" style={{ borderRadius: '50%', minWidth: '24px' }} />
  }
}

export const NetWorkButton = () => {
  const { chainId } = useWeb3React()
  const theme = useTheme()
  const connect = useConnect()
  const [netWorkAnchorEl, setNetWorkAnchorEl] = useState<null | HTMLElement>(null)
  const networkOpen = useMemo(() => {
    return Boolean(netWorkAnchorEl)
  }, [netWorkAnchorEl])

  const handleNetWorkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNetWorkAnchorEl(event.currentTarget)
  }
  const handleNetWorkClose = () => {
    setNetWorkAnchorEl(null)
  }

  const handleChangeNetWork = async (chainId: number) => {
    await connect(chainId)
    setNetWorkAnchorEl(null)
  }

  return (
    <>
      <Button
        css={headerBtn}
        sx={{
          color: '#000',
          borderRadius: '200px',
          textTransform: 'none',
          minWidth: '60px',
          backgroundColor: '#E1F25C',
          '&:hover': {
            backgroundColor: '#E1F25C',
            opacity: 0.8,
          },
        }}
        endIcon={
          networkOpen ? (
            <KeyboardArrowUpIcon sx={{ color: theme.palette.mode === 'dark' ? '#dedede' : '' }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: theme.palette.mode === 'dark' ? '#dedede' : '' }} />
          )
        }
        id="network-button"
        aria-controls={networkOpen ? 'network-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={networkOpen ? 'true' : undefined}
        onClick={handleNetWorkClick}
      >
        <NetWorkerLogo />
      </Button>
      <Menu
        sx={{
          '& .MuiPaper-root': {
            minWidth: 220,
          },
        }}
        id="network-menu"
        anchorEl={netWorkAnchorEl}
        open={networkOpen}
        onClose={handleNetWorkClose}
        MenuListProps={{
          'aria-labelledby': 'network-button',
        }}
      >
        <MenuItem
          sx={{ width: '100%' }}
          onClick={async () => {
            await handleChangeNetWork(ChainId.BSC)
          }}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            `}
          >
            <div css={align}>
              <BSC height="24" width="24" style={{ marginRight: '12px', borderRadius: '50%' }} />
              <span>BNB Smart Chain Mainnet</span>
            </div>
            {chainId === ChainId.BSC && (
              <DoneOutlinedIcon sx={{ color: theme.palette.mode === 'dark' ? '#dedede' : '' }} />
            )}
          </div>
        </MenuItem>
      </Menu>
    </>
  )
}
