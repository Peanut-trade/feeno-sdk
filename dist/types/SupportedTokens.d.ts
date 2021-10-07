interface TokenInfo {
    sybmol: string;
    preEstimate: any;
}
export interface SupportedTokens {
    [key: string]: TokenInfo;
}
export {};
