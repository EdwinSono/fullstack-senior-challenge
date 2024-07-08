export default class TransactionDTO {
  id: string;
  monedaOrigen: string;
  monedaDestino: string;
  monto: number;
  montoCambiado: number;
  tipoCambio: number;
  fecha: string;

  constructor(transaction: any) {
    this.id = transaction._id;
    this.monedaOrigen = transaction.currencySource;
    this.monedaDestino = transaction.currencyDestination;
    this.monto = transaction.amount;
    this.montoCambiado = transaction.amountChanged;
    this.tipoCambio = transaction.exchangeRate;
    this.fecha = transaction.createdAt;
  }
}

export { TransactionDTO };
