/** @jsxImportSource @emotion/react */
import { Trans } from '@lingui/macro'
import { card, pairInfo } from '../style'
import { align } from '../../../globalStyle'
import { css } from '@emotion/react'
import { Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRootStore } from '../../../store/root'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetMarketStats } from '../../../hook/hookV8/useGetMarketStats'
import { formatNumber } from '../../../utils'
// import { BASE_KRAV_TRADING_ADDRESS } from '../../../constant/chain'
import { TradeMode } from '../../../store/TradeSlice'
import { EXCHANGE_TRADING_T } from '../../../constant/exchange'
import { SelectPair } from '../../Dialog/SelectPair'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { BASE_KRAV_TRADING_ADDRESS } from '../../../constant/chain'

type PairInfoProps = {
  setIsOpenSelectToken: (isOpenSelectToken: boolean) => void
  tradeModel: TradeMode
  setTradeModel: (tradeModel: TradeMode) => void
}

export const PairInfo = ({ setIsOpenSelectToken, setTradeModel, tradeModel }: PairInfoProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [choosePair, setChoosePair] = useState(false)
  const {
    BTCPrice,
    isBTCRise,
    allPoolParams,
    tradePool,
    setTradePool,
    isLoadingFactory,
    setTradePairIndex,
    tradePairIndex,
    pairConfig,
  } = useRootStore((state) => ({
    BTCPrice: state.BTCPrice,
    isBTCRise: state.isBTCRise,
    tradePool: state.tradePool,
    setTradePool: state.setTradePool,
    allPoolParams: state.allPoolParams,
    isLoadingFactory: state.isLoadingFactory,
    setTradePairIndex: state.setTradePairIndex,
    tradePairIndex: state.tradePairIndex,
    pairConfig: state.pairConfig,
  }))

  const { openDaiLong, openDaiShort, borrowLongVal, borrowShortVal } = useGetMarketStats(
    tradePool?.storageT || '',
    tradePool?.decimals || 18,
    tradePool.pairInfoT || '',
    tradePairIndex
  )

  const showSwitch = useMemo(() => {
    return EXCHANGE_TRADING_T.includes(tradePool.tradingT) || Object.keys(pairConfig).length > 0
  }, [tradePool])

  const tradePair = useMemo(() => {
    return pairConfig[tradePairIndex]
  }, [tradePairIndex, pairConfig])

  const currentMode = useMemo(() => {
    if (tradeModel === TradeMode.DEGEN) return 'Degen'
    return 'Pro'
  }, [tradeModel])

  const [modeAnchorEl, setModeAnchorEl] = useState<null | HTMLElement>(null)

  const modeOpen = useMemo(() => {
    return Boolean(modeAnchorEl)
  }, [modeAnchorEl])

  const handleModeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModeAnchorEl(event.currentTarget)
  }

  const handleModeClose = () => {
    setModeAnchorEl(null)
  }

  useEffect(() => {
    setTradePairIndex(2)
    return () => setTradePairIndex(2)
  }, [showSwitch])

  useEffect(() => {
    if (allPoolParams.length > 0) {
      setTradePool(allPoolParams[0])
      const target = allPoolParams.find((pool) => pool.tradingT === BASE_KRAV_TRADING_ADDRESS)
      if (target) setTradePool(target)
      else setTradePool(allPoolParams[0])
    }
  }, [isLoadingFactory])

  return (
    <>
      <SelectPair isOpen={choosePair} setIsOpen={() => setChoosePair(false)} />
      <div
        css={[
          pairInfo,
          card,
          css`
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(2px);
            position: relative;
            @media screen and (max-width: 1500px) {
              overflow: auto;
              &::-webkit-scrollbar {
                width: 5px;
                height: 8px;
                //height: 4px;
              }
              &::-webkit-scrollbar-thumb {
                border-radius: 99px;
                background-color: ${theme.background.second};
              }
            }
            @media screen and (max-width: 1200px) {
              padding: 12px;
              &::-webkit-scrollbar {
                display: none;
                //height: 4px;
              }
            }
          `,
        ]}
      >
        <div
          css={css`
            position: absolute;
            width: calc(100% - 48px);
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 32px;
            `}
          >
            <div
              css={[
                css`
                  color: #fff;
                  leading-trim: both;
                  text-edge: cap;
                  font-variant-numeric: lining-nums proportional-nums;
                  font-family: 'Work Sans';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 140%; /* 22.4px */
                  padding-right: 16px;
                `,
              ]}
            >
              Market
            </div>
            <div css={[align]}>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                {isMobile && (
                  <>
                    <Button
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#a4a8fe' : '#2832f5',
                        borderRadius: '4px',
                        border: 'unset',
                        textTransform: 'none',
                        minWidth: '60px',
                      }}
                      endIcon={
                        modeOpen ? (
                          <KeyboardArrowUpIcon
                            sx={{
                              height: '12px',
                              width: '12px',
                              color: theme.palette.mode === 'dark' ? '#dedede' : '',
                            }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            sx={{
                              height: '12px',
                              width: '12px',
                              color: theme.palette.mode === 'dark' ? '#dedede' : '',
                            }}
                          />
                        )
                      }
                      id="network-button"
                      aria-controls={modeOpen ? 'network-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={modeOpen ? 'true' : undefined}
                      onClick={handleModeClick}
                    >
                      {currentMode}
                    </Button>
                    <Menu
                      sx={{
                        '& .MuiPaper-root': {
                          minWidth: 100,
                        },
                      }}
                      id="network-menu"
                      anchorEl={modeAnchorEl}
                      open={modeOpen}
                      onClose={handleModeClose}
                      MenuListProps={{
                        'aria-labelledby': 'network-button',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setTradeModel(TradeMode.DEGEN)
                          setModeAnchorEl(null)
                        }}
                      >
                        Degen
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setTradeModel(TradeMode.PRO)
                          setModeAnchorEl(null)
                        }}
                      >
                        Pro
                      </MenuItem>
                      {/*<MenuItem*/}
                      {/*  onClick={() => {*/}
                      {/*    setTradeModel(TradeMode.BASIC)*/}
                      {/*    setModeAnchorEl(null)*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  Basic*/}
                      {/*</MenuItem>*/}
                    </Menu>
                  </>
                )}
                {/*<KeyboardArrowDownIcon sx={{ height: '12px', width: '12px', marginLeft: '8px' }} />*/}
              </div>
              <div
                css={[
                  align,
                  css`
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    margin-left: ${isMobile ? '8px' : '0'};
                    margin-right: 32px;
                  `,
                ]}
              >
                <img src={tradePair.logoSource.default} height={'24'} width={'24'} alt={''} />
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    margin-left: 8px;
                    color: #fff;
                    font-family: 'Work Sans';
                    font-size: 22px;
                    font-weight: 600;
                    line-height: 130%;
                  `}
                >
                  {tradePair.titleSymbol}
                </div>
                <div
                  onClick={() => {
                    if (showSwitch) {
                      setChoosePair(true)
                    } else return
                  }}
                  css={css`
                    display: flex;
                    align-items: center;
                    margin-left: 16px;
                  `}
                >
                  <span
                    css={css`
                      color: ${isBTCRise ? '#009b72' : '#db4c40'};
                      font-size: 22px;
                      font-weight: 600;
                      line-height: 1.3;
                      font-family: 'Work Sans';
                    `}
                  >
                    ${BTCPrice.toFixed(tradePair.fixDecimals)}
                  </span>
                  {showSwitch && (
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 6px;
                        height: 32px;
                        width: 32px;
                        margin-left: 8px;
                      `}
                    >
                      <KeyboardArrowDownIcon sx={{ color: '#fff', height: '24px', width: '24px' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div css={align}>
              <div
                className="info-card"
                css={css`
                  padding: 0 24px !important;
                `}
              >
                <p>
                  <Trans>Open Interest(L)</Trans>
                </p>
                <p
                  css={css`
                    color: ${theme.text.primary};
                    display: flex;
                    align-items: center;
                  `}
                >
                  <span>{formatNumber(openDaiLong?.toString() || '', 2, false) || '-'}</span>
                </p>
              </div>
              <div
                className="info-card"
                css={css`
                  padding: 0 24px !important;
                `}
              >
                <p>
                  <Trans>Open Interest(S)</Trans>
                </p>
                <p
                  css={css`
                    color: ${theme.text.primary};
                    display: flex;
                    align-items: center;
                  `}
                >
                  <span>{formatNumber(openDaiShort?.toString() || '', 2, false) || '-'}</span>
                </p>
              </div>
              <div className="info-card" css={css``}>
                <p>
                  <Trans>Borrowing(L)</Trans>
                </p>
                <p
                  css={css`
                    color: ${openDaiShort && openDaiLong?.gt(openDaiShort)
                      ? '#009b72'
                      : openDaiLong?.toString() === openDaiShort?.toString()
                      ? '#fff'
                      : '#db4c40'};
                  `}
                >
                  <span>
                    {openDaiShort && openDaiLong?.gt(openDaiShort)
                      ? ''
                      : openDaiLong?.toString() === openDaiShort?.toString()
                      ? ''
                      : '-'}
                    {borrowLongVal?.abs()?.toFixed(4)}%
                  </span>
                </p>
              </div>
              <div className="info-card">
                <p>
                  <Trans>Borrowing(S)</Trans>
                </p>
                <p
                  css={css`
                    color: ${openDaiShort && openDaiLong?.gt(openDaiShort)
                      ? '#db4c40'
                      : openDaiLong?.toString() === openDaiShort?.toString()
                      ? '#fff'
                      : '#009b72'};
                  `}
                >
                  <span>
                    {openDaiShort && openDaiLong?.lt(openDaiShort)
                      ? ''
                      : openDaiLong?.toString() === openDaiShort?.toString()
                      ? ''
                      : '-'}
                    {borrowShortVal?.abs()?.toFixed(4)}%
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              background: ${theme.palette.mode === 'dark' ? '#0f1114' : '#0f1114'};
              padding: 4px;
              border-radius: 8px;
            `}
          >
            <div
              css={css`
                font-family: 'Inter';
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                text-align: center;
                height: 30px;
                line-height: 130%;
                border-radius: 8px;
                cursor: pointer;
                width: 83px;
                font-weight: 600;
                background: ${tradeModel === TradeMode.PRO
                  ? 'linear-gradient(180deg, #84ff9f 0%, #ffe071 49.53%, #f96262 96.35%)'
                  : 'transparent'};
                color: ${tradeModel === TradeMode.PRO ? '#000' : '#fff'};
              `}
              onClick={() => setTradeModel(TradeMode.PRO)}
            >
              Pro
            </div>
            <div
              css={css`
                font-family: 'Inter';
                font-size: 12px;
                font-style: normal;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 83px;
                height: 30px;
                border-radius: 8px;
                line-height: 130%;
                text-align: center;
                cursor: pointer;
                font-weight: 600;
                background: ${tradeModel === TradeMode.DEGEN
                  ? 'linear-gradient(180deg, #84ff9f 0%, #ffe071 49.53%, #f96262 96.35%)'
                  : 'transparent'};
                color: ${tradeModel === TradeMode.DEGEN ? '#000' : '#fff'};
              `}
              onClick={() => setTradeModel(TradeMode.DEGEN)}
            >
              Degen
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
