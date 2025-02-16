export interface AutoWithdrawInterface {
    clientId: string;
    withdrawAmount: number;
    bankName: string;
    isAutomatic: boolean;
    accountNo: string;
    autoWithdrawDate: string;
    isMonthly: boolean;
}