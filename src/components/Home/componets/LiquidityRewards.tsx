/** @jsxImportSource @emotion/react */
import KRAVTab from '../../KravUIKit/KravTab'
import { formatNumber, getBigNumberStr } from '../../../utils'
import { ReactComponent as AlertIcon } from '../../../assets/imgs/alert.svg'
import { ReactComponent as QuestionIcon } from '../../../assets/imgs/question.svg'
import { ReactComponent as ArrowLeft } from '../../../assets/imgs/arrowLeft.svg'
import { ReactComponent as ArrowLeftDark } from '../../../assets/imgs/darkModel/arrow_left_dark.svg'
import KRAVHollowButton from '../../KravUIKit/KravHollowButton'
import { ReactComponent as BoostIcon } from '../../../assets/imgs/boost_icon.svg'
import { align } from '../../../globalStyle'
import { KravRewardCard } from './KravRewardCard'
import { Box, css, Popover, Tooltip, useTheme } from '@mui/material'
import BigNumber from 'bignumber.js'
import { OverviewData } from '../../../hook/hookV8/useGetTotalMarketOverview'
import { useGetAllLpReward } from '../../../hook/hookV8/useGetLpReward'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

type LiquidityRewardsProps = {
  lpRewardAmount: BigNumber
  contractAmount: BigNumber
  claimLpRewardKrav: (isTrade: boolean) => Promise<void>
  overviewData: OverviewData
  LpBooster: BigNumber
  nextEpoch: number
  userLiquidityProvided: number
}
export const LiquidityRewards = ({
  lpRewardAmount,
  contractAmount,
  claimLpRewardKrav,
  overviewData,
  LpBooster,
  nextEpoch,
  userLiquidityProvided,
}: LiquidityRewardsProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { userFeesRewardList } = useGetAllLpReward()
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = useMemo(() => {
    return Boolean(anchorEl)
  }, [anchorEl])
  return (
    <>
      <div>
        <div
          css={css`
            margin: 40px 0;
          `}
          className="title gt"
        >
          Liquidity Provider Rewards
        </div>
        <div
          className="overview-card"
          css={css`
            background: ${theme.background.primary};
          `}
        >
          <div>
            <KRAVTab>Total Liquidity Provider</KRAVTab>
            <p className="data gt">{formatNumber(overviewData.liquiditySupply, 2, true)}</p>
          </div>
          <div
            css={css`
              border-left: ${theme.splitLine.primary};
            `}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center' }}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <KRAVTab>Your Liquidity Provider</KRAVTab>
              &nbsp;&nbsp;
              <AlertIcon />
            </Box>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <div
                css={css`
                  width: 360px;
                  padding: 12px 16px;
                  border-radius: 8px;
                `}
              >
                <div
                  css={css`
                    font-size: 12px;
                    padding-bottom: 16px;
                  `}
                >
                  When actually distributing income, calculate your ratio according to your trading volume after boost
                </div>
                <div
                  css={css`
                    font-size: 14px;
                    padding-bottom: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}
                >
                  <div>Actual Liquidity Provider</div>
                  <span
                    css={css`
                      font-size: 16px;
                      font-weight: 500;
                    `}
                  >
                    {formatNumber(userLiquidityProvided, 2)}
                  </span>
                </div>
                <div
                  css={css`
                    font-size: 14px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}
                >
                  <span>Liquidity Provider after boost</span>
                  <span
                    css={css`
                      font-size: 16px;
                      font-weight: 500;
                    `}
                  >
                    {formatNumber(
                      LpBooster.isEqualTo(0)
                        ? userLiquidityProvided
                        : LpBooster.times(userLiquidityProvided).toNumber(),
                      2,
                      true
                    )}
                  </span>
                </div>
              </div>
            </Popover>
            <p className="data gt">{formatNumber(userLiquidityProvided, 2, true)}</p>
          </div>
          <div
            css={css`
              border-left: ${theme.splitLine.primary};
            `}
          >
            <KRAVTab>Share of pool</KRAVTab>
            <p className="data gt">{formatNumber(userLiquidityProvided / overviewData.liquiditySupply, 2, false)} %</p>
          </div>
          <div
            css={css`
              border-left: ${theme.splitLine.primary};
            `}
          >
            <Tooltip
              title={
                'Locking KRAV can get krav income and veKRAV rights and interests, which can Boost your yield up to 2.5x'
              }
            >
              <div css={[align]}>
                <KRAVTab>My Boost</KRAVTab>
                &nbsp;&nbsp;
                <QuestionIcon />
              </div>
            </Tooltip>
            <p
              className="data gt"
              css={[
                align,
                css`
                  justify-content: space-between;
                  padding-top: 0 !important;
                `,
              ]}
            >
              <span
                css={css`
                  padding-top: 2px;
                `}
                className="data gt"
              >
                {getBigNumberStr(LpBooster, 2)}
              </span>
              <KRAVHollowButton
                onClick={() => navigate('/portfolio/stake')}
                sx={{ borderRadius: '100px', width: '96px', height: '30px', minHeight: '30px' }}
              >
                <span
                  css={css`
                    min-width: 24px;
                  `}
                >
                  Boost&nbsp;
                </span>
                <BoostIcon />
              </KRAVHollowButton>
            </p>
          </div>
        </div>
      </div>
      <div css={[align]} className="liquidity-reward-action">
        <KravRewardCard
          isTrade={false}
          backendAmount={lpRewardAmount}
          contractAmount={contractAmount}
          claimMethod={claimLpRewardKrav}
          nextEpoch={nextEpoch}
        />
        <div
          className="fees-rewards"
          css={css`
            background: ${theme.background.primary};
          `}
        >
          <div className="flex">
            <div className="title gt">Fees Rewards</div>
            <div css={align}>
              {/*<span>What is this?&nbsp;&nbsp;</span>*/}
              {/*<QuestionIcon />*/}
            </div>
          </div>
          <div
            css={css`
              > div:last-of-type {
                border-bottom: unset;
              }
              > div {
                border-bottom: ${theme.splitLine.primary};
              }
              margin-top: 25px;
              min-height: 144px;
              max-height: 144px;
              overflow: auto;
              &::-webkit-scrollbar {
                display: none
              },
            `}
          >
            {userFeesRewardList.length > 0 &&
              userFeesRewardList.map((list) => {
                return (
                  <div key={list.position.pool.tradingT} className="reward-item">
                    <img
                      css={css`
                        border-radius: 50%;
                        background: ${theme.palette.mode === 'dark' ? '#fff' : ''};
                      `}
                      src={list.position.pool.logoSource}
                      height="32"
                      width="32"
                    />
                    <span>
                      &nbsp;&nbsp;{formatNumber(list.rewardAmount.toString(), 2)} {list.position.pool.symbol}
                    </span>
                  </div>
                )
              })}
            {userFeesRewardList.length === 0 && (
              <div
                css={css`
                  text-align: center;
                  padding-top: 40px;
                  color: ${theme.text.second};
                `}
              >
                No Fees Reward
              </div>
            )}
          </div>
          <div className="flex">
            <div
              css={css`
                padding-right: 36px;
              `}
            >
              {"Navigate to the 'dashboard' page to claim your fee earnings"}
            </div>
            <div css={align}>
              <span
                css={css`
                  font-weight: 500;
                  font-size: 16px;
                  white-space: nowrap;
                  margin-right: 8px;
                `}
              >
                VIEW MORE
              </span>
              {theme.palette.mode === 'dark' ? (
                <ArrowLeftDark
                  onClick={() => navigate('/portfolio')}
                  className="poolArrow"
                  css={css`
                    cursor: pointer;
                    :hover {
                      transform: scale(1.1);
                    }
                  `}
                />
              ) : (
                <ArrowLeft
                  className="poolArrow"
                  onClick={() => navigate('/portfolio')}
                  css={css`
                    cursor: pointer;
                    margin-left: 16px;
                    :hover {
                      transform: scale(1.1);
                    }
                  `}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
