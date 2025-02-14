/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { bottomCard } from '../style'
import { useRootStore } from '../../../store/root'
import { useTheme } from '@mui/material'

export const PositionOverView = () => {
  const theme = useTheme()
  const tradePool = useRootStore((state) => state.tradePool)
  return (
    <div
      css={[
        bottomCard,
        css`
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          color: #fff;
        `,
      ]}
    >
      <div
        css={css`
          border-bottom: ${theme.splitLine.primary};
        `}
      >
        Long BTC
      </div>
      <div
        css={css`
          padding: 12px 24px 16px;
        `}
      >
        <p className="card-details">
          <span>Available Liquidity:&nbsp;</span>
          <span>
            {tradePool?.poolCurrentBalance?.toFixed(2)} {tradePool?.symbol}
          </span>
        </p>
      </div>
    </div>
  )
}
