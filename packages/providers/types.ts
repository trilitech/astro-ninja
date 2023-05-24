export interface WalletConnection {
  imageUrl?: string
  connectionType?: string
  name?: string
}
export interface WalletInfo {
  address: string
  connection: WalletConnection
}
export interface TezpayDetails {
  receiverAddress: string
  amountMutez: number
  id: string
  expiresAt: string
}

export interface WalletApi {
  transfer: (details: TezpayDetails) => Promise<string | undefined>
  address: string
  connection: WalletConnection
  disconnect: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BeaconOptions {}
export interface KukaiOptions {
  showEmail?: boolean
}

export type ConnectFn = (
  isNewConnection: boolean,
  connectionOptions?: BeaconOptions
) => Promise<WalletApi>