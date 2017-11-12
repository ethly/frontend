// @flow

import axios from 'axios';

import type { Link } from 'common/Link';

const myApi = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export function getLinks(): Promise<Array<Link>>  {
  return myApi.get('links')
    .then(response => response.data);
}
