export interface AutoWithdrawInterface {
    clientId: string;
    accountNo: string;
    bankName: string;
    withdrawAmount: string;
    isAutomatic: boolean;
    autoWithdrawDate: Date;
    isMonthly: boolean;
    requestDate: Date;
}
