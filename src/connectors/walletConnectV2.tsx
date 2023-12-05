import { initializeConnector } from '@web3-react/core'
import { WalletConnect, WalletConnectConstructorArgs } from '@web3-react/walletconnect-v2'
import { Actions } from '@web3-react/types'
import { Connection, ConnectionType } from './type'
import { CHAINS } from './chain'
import { API_CONFIG, ChainId, DEFAULT_CHAIN } from '../constant/chain'

const [...optionalChains] = Object.keys(CHAINS).map(Number)
export class WalletConnectV2 extends WalletConnect {
  constructor({
    actions,
    defaultChainId,
    qrcode = true,
  }: Omit<WalletConnectConstructorArgs, 'options'> & { defaultChainId: number; qrcode?: boolean }) {
    const darkmode = Boolean(window.matchMedia('(prefers-color-scheme: dark)'))
    super({
      actions,
      options: {
        projectId: '4222f6ebe425d072fe1f47ad94796538',
        chains: [defaultChainId],
        optionalChains: optionalChains,
        showQrModal: qrcode,
        rpcMap: [API_CONFIG[DEFAULT_CHAIN].rpcNode],
        optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
        qrModalOptions: {
          desktopWallets: undefined,
          enableExplorer: true,
          explorerExcludedWalletIds: undefined,
          explorerRecommendedWalletIds: undefined,
          mobileWallets: undefined,
          privacyPolicyUrl: undefined,
          termsOfServiceUrl: undefined,
          themeMode: darkmode ? 'dark' : 'light',
          walletImages: undefined,
        },
      },
    })
  }

  activate(chainId?: number, setEvent?: () => void) {
    return super.activate(chainId).then(() => {
      if (setEvent) setEvent()
    })
  }
}

export const walletConnectV2Connection: Connection = new (class implements Connection {
  private initializer = (actions: Actions, defaultChainId = ChainId.BSC) =>
    new WalletConnectV2({ actions, defaultChainId })

  type = ConnectionType.WALLET_CONNECT_V2
  getName = () => 'WalletConnect'
  getIcon = () => ''
  shouldDisplay = () => true

  private _connector = initializeConnector<WalletConnectV2>(this.initializer)
  overrideActivate = (chainId?: ChainId) => {
    // Always re-create the connector, so that the chainId is updated.
    this._connector = initializeConnector((actions) => this.initializer(actions, chainId))
    return false
  }
  get connector() {
    return this._connector[0]
  }
  get hooks() {
    return this._connector[1]
  }
})()
