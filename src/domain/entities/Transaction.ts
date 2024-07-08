class Transaction {
  currencySource: string;
  currencyDestination: string;
  exchangeRate: number;
  amount: number;
  amountChanged: number;

  constructor(transaction: any, exchangeRate: number, amountChanged: number) {
    this.currencySource = transaction.monedaOrigen;
    this.currencyDestination = transaction.monedaDestino;
    this.exchangeRate = exchangeRate;
    this.amount = transaction.monto;
    this.amountChanged = amountChanged;
  }
}

export { Transaction };
