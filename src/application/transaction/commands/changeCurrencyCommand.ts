import { IChangeCurrency } from "../../../domain/interfaces/iChangeCurrency";
import { IExchangeRate } from "../../../domain/interfaces/iExchangeRate";
import { TransactionDTO } from "../../../domain/dtos/transaction.dto";
import { Transaction } from "../../../domain/entities/Transaction";

export default class ChangeCurrencyCommand {
  transactionRepository: any;
  sunatAPI: any;

  constructor(transactionRepository: any, sunatAPI: any) {
    this.transactionRepository = transactionRepository;
    this.sunatAPI = sunatAPI;
  }

  async execute(
    transactionData: IChangeCurrency,
  ): Promise<Transaction | object> {
    try {
      const { exchangeRate, amountChanged } = await this.calculateExchangeRate(
        transactionData.monto,
        transactionData.monedaOrigen,
        transactionData.monedaDestino,
      );
      const transaction = new Transaction(
        transactionData,
        exchangeRate,
        amountChanged,
      );
      const transactionSaved =
        await this.transactionRepository.create(transaction);
      return new TransactionDTO(transactionSaved);
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  async calculateExchangeRate(
    amount: number,
    currencySource: string,
    currencyDestination: string,
  ) {
    let exchangeRate;
    let amountChanged;
    const exchangeRateCurrent: IExchangeRate =
      await this.sunatAPI.getExchangeRate();

    if (
      currencyDestination === "PEN" &&
      currencySource === exchangeRateCurrent.moneda
    ) {
      // De USD a PEN
      exchangeRate = exchangeRateCurrent.compra;
      amountChanged = amount * exchangeRate;
    } else if (
      currencySource === "PEN" &&
      currencyDestination === exchangeRateCurrent.moneda
    ) {
      // De PEN a USD
      exchangeRate = exchangeRateCurrent.venta;
      amountChanged = amount / exchangeRate;
    } else {
      throw new Error(
        "Monedas no soportadas o no coinciden con la tasa de cambio.",
      );
    }
    return { exchangeRate, amountChanged: Number(amountChanged.toFixed(2)) };
  }
}
