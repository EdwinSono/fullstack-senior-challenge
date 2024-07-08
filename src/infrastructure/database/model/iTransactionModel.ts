import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  currencySource: string;
  currencyDestination: string;
  exchangeRate: number;
  amount: number;
  amountChanged: number;
}

const TransactionSchema: Schema = new Schema(
  {
    currencySource: { type: String, required: true },
    currencyDestination: { type: String, required: true },
    exchangeRate: { type: Number, required: true },
    amount: { type: Number, required: true },
    amountChanged: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
