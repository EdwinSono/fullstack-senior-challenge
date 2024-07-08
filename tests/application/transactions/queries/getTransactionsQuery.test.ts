import GetTransactionsQuery from "../../../../src/application/transaction/queries/getTransactionsQuery";
import { ITransactionRequest } from "../../../../src/domain/interfaces/iTransaction";
import { TransactionDTO } from "../../../../src/domain/dtos/transaction.dto";
import { ITransaction } from "../../../../src/domain/interfaces/iTransaction";

// Mocking the Transaction Repository
const mockTransactionRepository = {
  findAll: jest.fn(),
};

describe("GetTransactionsQuery", () => {
  let getTransactionsQuery: GetTransactionsQuery;

  beforeEach(() => {
    getTransactionsQuery = new GetTransactionsQuery(mockTransactionRepository);
  });

  it("should return transactions within the date range", async () => {
    const request: ITransactionRequest = {
      fechaInicio: "2024-07-01",
      fechaFinal: "2024-07-31",
    };

    const mockTransactions: ITransaction[] = [
      {
        id: "1",
        currencySource: "USD",
        currencyDestination: "PEN",
        exchangeRate: 3.733,
        amount: 100,
        amountChanged: 373.3,
        createdAt: new Date("2024-07-15T10:00:00Z"),
      },
      {
        id: "2",
        currencySource: "USD",
        currencyDestination: "PEN",
        exchangeRate: 3.733,
        amount: 200,
        amountChanged: 746.6,
        createdAt: new Date("2024-07-20T12:00:00Z"),
      },
    ];

    mockTransactionRepository.findAll.mockResolvedValue(mockTransactions);

    const result = await getTransactionsQuery.execute(request);

    expect(result).toEqual(
      mockTransactions.map((tx) => new TransactionDTO(tx)),
    );
    expect(mockTransactionRepository.findAll).toHaveBeenCalledWith({
      createdAt: {
        $gte: new Date("2024-07-01T00:00:00Z"),
        $lte: new Date("2024-07-31T23:59:59Z"),
      },
    });
  });

  it("should return an empty array if no transactions are found", async () => {
    const request: ITransactionRequest = {
      fechaInicio: "2024-07-01",
      fechaFinal: "2024-07-31",
    };

    mockTransactionRepository.findAll.mockResolvedValue([]);

    const result = await getTransactionsQuery.execute(request);

    expect(result).toEqual([]);
    expect(mockTransactionRepository.findAll).toHaveBeenCalledWith({
      createdAt: {
        $gte: new Date("2024-07-01T00:00:00Z"),
        $lte: new Date("2024-07-31T23:59:59Z"),
      },
    });
  });

  it("should throw an error if the repository call fails", async () => {
    const request: ITransactionRequest = {
      fechaInicio: "2024-07-01",
      fechaFinal: "2024-07-31",
    };

    mockTransactionRepository.findAll.mockRejectedValue(
      new Error("Repository error"),
    );

    await expect(getTransactionsQuery.execute(request)).rejects.toThrow(
      "Repository error",
    );
  });
});
