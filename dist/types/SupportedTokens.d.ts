interface TokenInfo {
    symbol: string;
    preEstimate: any;
}
export interface SupportedTokens {
    [key: string]: TokenInfo;
}
export {};
