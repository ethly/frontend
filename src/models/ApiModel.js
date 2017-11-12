// @flow

export function getVersion(): Promise<number> {
  return new Promise(resolve => setTimeout(resolve, 1500, 1.1));
}
