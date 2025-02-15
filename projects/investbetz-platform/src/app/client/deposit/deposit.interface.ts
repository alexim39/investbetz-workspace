export interface DepositInterface {
    clientId: string;
    transactionId: number;
    clientEmail: string;
    depositAmount: number;
    transactionMethod: string;
    transactionStatus: string;
}
