/** @jsxImportSource @emotion/react */
import { useMediaQuery, useTheme } from '@mui/material'
import { dialogContent } from './sytle'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import { useRootStore } from '../../store/root'
import { css } from '@emotion/react'
import { SelectTokenItem } from './SelectTokenItem'
import { DialogLayout } from './DialogLayout'

type SelectTokenProps = {
  isOpen: boolean
  setIsOpen: (isOpenSelectToken: boolean) => void
}

export const SelectToken = ({ isOpen, setIsOpen }: SelectTokenProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const allPoolParams = useRootStore((state) => state.allPoolParams)
  return (
    <DialogLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div css={dialogContent}>
        <div
          className="select-token-header"
          css={css`
            border-bottom: ${theme.splitLine.primary};
            font-size: ${isMobile ? '18px' : '20px'};
          `}
        >
          <div>
            <span>Select a token</span>
            <CloseSharpIcon sx={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
          </div>
        </div>
        <div
          className="select-token-list"
          css={css`
            border-bottom: ${theme.splitLine.primary};
            > div {
              :hover {
                background: ${theme.palette.mode === 'dark' ? '#4B4B4B' : '#f6f6f6'};
              }
            }
          `}
        >
          {allPoolParams.length > 0 &&
            allPoolParams.map((pool) => {
              return <SelectTokenItem pool={pool} setIsOpen={setIsOpen} key={pool.tradingT} />
            })}
        </div>
      </div>
    </DialogLayout>
  )
}
