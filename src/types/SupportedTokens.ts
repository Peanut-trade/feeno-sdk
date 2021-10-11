interface TokenInfo {
  symbol: string;
  decimals: string;
  preEstimate: any;
}
export interface SupportedTokens {
  [key: string]: TokenInfo;
}
