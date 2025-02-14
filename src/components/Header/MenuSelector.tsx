/** @jsxImportSource @emotion/react */
import { headerBtn, router } from './sytle'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, Menu, MenuItem, useTheme } from '@mui/material'
import { css } from '@emotion/react'
import React, { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Trans } from '@lingui/macro'

export const MenuSelector = () => {
  const theme = useTheme()
  const { pathname } = useLocation()
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

  const isTradePath = useMemo(() => {
    return pathname.includes('/trade')
  }, [pathname])

  const routerColor = useMemo(() => {
    return css`
      color: #000;
      :hover {
        color: #000000;
      },
    `
  }, [theme])

  const routerActive = useMemo(() => {
    return css`
      background: ${theme.palette.mode === 'dark' ? '#4b4b4b' : '#F5F4F3'};
      color: #000000;
      //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `
  }, [theme])

  const itemPadding = useMemo(() => {
    return css`
      padding: 0 !important;
    `
  }, [])

  return (
    <>
      <Button
        css={headerBtn}
        sx={{
          color: '#121212',
          borderRadius: '200px',
          textTransform: 'none',
          marginRight: '9px',
          minWidth: '60px',
          fontWeight: 500,
          backgroundColor: '#E1F25C',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: '#E1F25C',
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
        {pathname === '/liquidity' ? 'Liquidity' : 'Trade'}
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
        {pathname === '/liquidity' && (
          <MenuItem sx={{ width: '100%' }}>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              `}
            >
              <NavLink to={'/trade'} css={[router, routerColor, isTradePath ? routerActive : '', itemPadding]}>
                <Trans>Trade</Trans>
              </NavLink>
            </div>
          </MenuItem>
        )}
        {pathname === '/trade' && (
          <MenuItem sx={{ width: '100%' }}>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              `}
            >
              <NavLink to={'/liquidity'} css={[router, routerColor, itemPadding]}>
                <Trans>Liquidity</Trans>
              </NavLink>
            </div>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
