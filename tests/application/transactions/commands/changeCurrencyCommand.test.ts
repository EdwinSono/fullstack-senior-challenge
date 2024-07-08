import ChangeCurrencyCommand from "../../../../src/application/transaction/commands/changeCurrencyCommand";
import { IChangeCurrency } from "../../../../src/domain/interfaces/iChangeCurrency";
import { IExchangeRate } from "../../../../src/domain/interfaces/iExchangeRate";
import { TransactionDTO } from "../../../../src/domain/dtos/transaction.dto";
import { Transaction } from "../../../../src/domain/entities/Transaction";

// Mocking the Transaction Repository
const mockTransactionRepository = {
  create: jest.fn(),
};

// Mocking the SUNAT API
const mockSunatAPI = {
  getExchangeRate: jest.fn(),
};

describe("ChangeCurrencyCommand", () => {
  let changeCurrencyCommand: ChangeCurrencyCommand;

  beforeEach(() => {
    changeCurrencyCommand = new ChangeCurrencyCommand(
      mockTransactionRepository,
      mockSunatAPI,
    );
  });

  it("should calculate exchange rate correctly from USD to PEN", async () => {
    const transactionData: IChangeCurrency = {
      monto: 100,
      monedaOrigen: "USD",
      monedaDestino: "PEN",
    };

    const exchangeRate: IExchangeRate = {
      compra: 3.733,
      venta: 3.739,
      origen: "SUNAT",
      moneda: "USD",
      fecha: "2024-01-18",
    };

    mockSunatAPI.getExchangeRate.mockResolvedValue(exchangeRate);

    const { exchangeRate: rate, amountChanged } =
      await changeCurrencyCommand.calculateExchangeRate(
        transactionData.monto,
        transactionData.monedaOrigen,
        transactionData.monedaDestino,
      );

    expect(rate).toBe(exchangeRate.compra);
    expect(amountChanged).toBe(373.3);
  });

  it("should calculate exchange rate correctly from PEN to USD", async () => {
    const transactionData: IChangeCurrency = {
      monto: 1000,
      monedaOrigen: "PEN",
      monedaDestino: "USD",
    };

    const exchangeRate: IExchangeRate = {
      compra: 3.733,
      venta: 3.739,
      origen: "SUNAT",
      moneda: "USD",
      fecha: "2024-01-18",
    };

    mockSunatAPI.getExchangeRate.mockResolvedValue(exchangeRate);

    const { exchangeRate: rate, amountChanged } =
      await changeCurrencyCommand.calculateExchangeRate(
        transactionData.monto,
        transactionData.monedaOrigen,
        transactionData.monedaDestino,
      );

    expect(rate).toBe(exchangeRate.venta);
    expect(amountChanged).toBeCloseTo(267.45, 2);
  });

  it("should execute transaction correctly", async () => {
    const transactionData: IChangeCurrency = {
      monto: 100,
      monedaOrigen: "USD",
      monedaDestino: "PEN",
    };

    const exchangeRate: IExchangeRate = {
      compra: 3.733,
      venta: 3.739,
      origen: "SUNAT",
      moneda: "USD",
      fecha: "2024-01-18",
    };

    const transaction = new Transaction(
      transactionData,
      exchangeRate.compra,
      373.3,
    );

    const transactionSaved = {
      ...transaction,
      id: "1",
    };

    mockSunatAPI.getExchangeRate.mockResolvedValue(exchangeRate);
    mockTransactionRepository.create.mockResolvedValue(transactionSaved);

    const result = await changeCurrencyCommand.execute(transactionData);

    expect(result).toEqual(new TransactionDTO(transactionSaved));
  });

  it("should return error object on exception", async () => {
    const transactionData: IChangeCurrency = {
      monto: 100,
      monedaOrigen: "USD",
      monedaDestino: "PEN",
    };

    mockSunatAPI.getExchangeRate.mockRejectedValue(new Error("API Error"));

    const result = await changeCurrencyCommand.execute(transactionData);

    expect(result).toEqual({ error: "API Error" });
  });
});
