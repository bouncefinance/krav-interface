import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
// import useEagerlyConnect from '../hook/hookV8/useEagerlyConnect'
import { connections } from '.'
import { Connector } from '@web3-react/types'

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const connectors = connections.map<[Connector, Web3ReactHooks]>(({ hooks, connector }) => [connector, hooks])
  // useEagerlyConnect()
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
