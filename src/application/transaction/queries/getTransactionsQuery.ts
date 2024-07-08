import { TransactionDTO } from "../../../domain/dtos/transaction.dto";
import {
  ITransaction,
  ITransactionRequest,
} from "../../../domain/interfaces/iTransaction";

export default class GetTransactionsQuery {
  transactionRepository: any;
  constructor(transactionRepository: any) {
    this.transactionRepository = transactionRepository;
  }

  async execute(request: ITransactionRequest): Promise<TransactionDTO[]> {
    const query = {
      createdAt: {
        $gte: new Date(request.fechaInicio + "T00:00:00Z"),
        $lte: new Date(request.fechaFinal + "T23:59:59Z"),
      },
    };
    const transactions = await this.transactionRepository.findAll(query);
    const list = transactions.map((transaction: ITransaction) => {
      return new TransactionDTO(transaction);
    });
    return list;
  }
}
