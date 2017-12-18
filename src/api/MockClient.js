// @flow

import {
  type ApiClient,
} from '.'

import type {
  ApiResponse,
  LinkDescription,
  TransactionDraft,
  AddLinkTransaction,
  SignedTransaction,
  TransactionReceipt,
} from './entities'

export class MockApiClient implements ApiClient {
  static links = [
    {label: 'Link', url: 'www.google.com', description: '', hashtags: []},
    {label: 'Other link', url: 'www.google.ru', description: '', hashtags: []},
    {label: 'Test link', url: 'www.fb.com', description: '', hashtags: []},
  ]

  createLink(
    link: LinkDescription,
    draft: TransactionDraft,
  ): Promise<AddLinkTransaction> {
    MockApiClient.links.push(link)
    return Promise.resolve(
      {
        data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
        to: '0x0000000000000000000000000000000000000000',
        ...draft,
      }
    )
  }

  executeTransaction(
    transaction: SignedTransaction,
  ): Promise<TransactionReceipt> {
    return Promise.resolve({
      transactionHash: 'mock',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
      gasUsed: 0,
    })
  }

  getAllLinks(): Promise<Array<LinkDescription>> {
    return Promise.resolve(MockApiClient.links)
  }

  getLinksByHashtag(hashtag: string): Promise<Array<LinkDescription>> {
    return this.getAllLinks()
  }
}

export default new MockApiClient()
