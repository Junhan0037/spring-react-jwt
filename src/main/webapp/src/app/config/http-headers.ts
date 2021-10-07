export interface getHeaderResult {
  'Content-Type': string
  'X-Requested-With': string
}

export const getHeader = (): getHeaderResult => {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
}