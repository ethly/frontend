// @flow

import axios, {
  type Axios,
  type $AxiosXHR,
} from 'axios'

import type {
  ApiResponse,
  LinkDescription,
  TransactionDraft,
  AddLinkTransaction,
  SignedTransaction,
  TransactionReceipt,
} from './entities'

export interface ApiClient {
  createLink(
    link: LinkDescription,
    draft: TransactionDraft,
  ): Promise<AddLinkTransaction>;

  executeTransaction(
    transaction: SignedTransaction,
  ): Promise<TransactionReceipt>;

  getAllLinks(): Promise<Array<LinkDescription>>;

  getLinksByHashtag(hashtag: string): Promise<Array<LinkDescription>>;
}

export class RestApiClient implements ApiClient {
  client: Axios

  constructor(
    baseURL: string,
  ) {
    this.client = axios.create({
      baseURL: baseURL,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  _processResponse<T>(response: $AxiosXHR<ApiResponse<T>>): Promise<T> {
    const data = response.data
    if (data.error) {
      return Promise.reject(data.error)
    }
    if (data.data) {
      return Promise.resolve(data.data)
    }
    return Promise.reject("Unexpected response format")
  }

  // eslint-disable-next-line
  get<T>(...params: any): Promise<T> {
    return this.client.get(...params).then(this._processResponse)
  }

  // eslint-disable-next-line
  post<T>(...params: any): Promise<T> {
    return this.client.post(...params).then(this._processResponse)
  }

  createLink(
    link: LinkDescription,
    draft: TransactionDraft,
  ): Promise<AddLinkTransaction> {
    return this.post('links', {
      link: link,
      draft: draft,
    })
  }

  executeTransaction(
    transaction: SignedTransaction,
  ): Promise<TransactionReceipt> {
    return this.post('execute', {
      transaction: transaction,
    })
  }

  getAllLinks(): Promise<Array<LinkDescription>> {
    return this.get('links')
  }

  getLinksByHashtag(hashtag: string): Promise<Array<LinkDescription>> {
    return this.get(`links/hashtags/${hashtag}`)
  }
}

export default new RestApiClient(process.env.REACT_APP_API_URL || 'localhost')
