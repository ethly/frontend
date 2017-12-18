// @flow

export type ApiResponse<T> = {
  data?: T,
  error?: string,
}

export type LinkDescription = {
  label: string,
  url: string,
  description: string,
  hashtags: Array<string>,
}

export type EthereumAddress = string
export function checkCorrectEthereumAddress(address: string): boolean {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}

export type TransactionDraft = {
  from: EthereumAddress,
  gas ?: number,
  gasPrice ?: number,
};

export type AddLinkRequest = {
  link: LinkDescription,
  draft: TransactionDraft,
}

export type AddLinkTransaction = TransactionDraft & WithReceiver

export type SignedTransaction = string;

export type TransactionReceipt = {
  transactionHash: string,
  from: EthereumAddress,
  to: EthereumAddress,
  gasUsed: number,
};



type WithReceiver = {
  to: EthereumAddress,
}

type WithValue = {
  value: string,
}
