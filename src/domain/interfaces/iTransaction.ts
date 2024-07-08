export interface ITransaction {
  id: string;
  currencySource: string;
  currencyDestination: string;
  exchangeRate: number;
  amount: number;
  amountChanged: number;
  createdAt: Date;
}

export interface ITransactionRequest {
  fechaInicio: string;
  fechaFinal: string;
}
