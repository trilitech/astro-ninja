export interface WalletConnection {
  imageUrl?: string;
  connectionType?: string;
  name?: string;
}
export interface WalletInfo {
  address: string;
  connection: WalletConnection;
}
export interface ContractCallDetails {
  contractAddress: string;
  amountMutez: number;
  id: string;
}

export interface WalletApi {
  callcontract: (details: ContractCallDetails) => Promise<string | undefined>;
  address: string;
  connection: WalletConnection;
  disconnect: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BeaconOptions {}
export interface KukaiOptions {
  showEmail?: boolean;
}

export type ConnectFn = (
  isNewConnection: boolean,
  connectionOptions?: BeaconOptions
) => Promise<WalletApi>;
