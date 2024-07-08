import { Model } from "mongoose";
import Transaction, { ITransaction } from "../model/iTransactionModel";

class TransactionRepository {
  private model: Model<ITransaction>;

  constructor() {
    this.model = Transaction;
  }

  public async create(
    transaction: Partial<ITransaction>,
  ): Promise<ITransaction> {
    const newTransaction = new this.model(transaction);
    return await newTransaction.save();
  }

  public async findAll(query: object): Promise<ITransaction[]> {
    return await this.model.find(query).exec();
  }
}

export default TransactionRepository;
