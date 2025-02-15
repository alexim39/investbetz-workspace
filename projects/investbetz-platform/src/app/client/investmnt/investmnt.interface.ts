export interface InvestmntInterface {
    clientId: string;
    amount: number;
    investedFrom: string;
    period: number;
    plan: string;
    wager?: string; 
    transactionId: number;
    transactionStatus: string;
}