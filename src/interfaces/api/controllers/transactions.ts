import { Request, Response } from "express";
import { transactionRepository } from "../../../infrastructure/database/repository";
import ChangeCurrencyCommand from "../../../application/transaction/commands/changeCurrencyCommand";
import GetTransactionsQuery from "../../../application/transaction/queries/getTransactionsQuery";
import { SunatAPI } from "../../../infrastructure/Sunat";
import {
  changeCurrencySchema,
  getTransactionsSchema,
} from "../schemas/transactions.schema";

export const changeCurrency = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ error: "No data" });
  }

  try {
    const sunatAPI = new SunatAPI();
    const changeCurrencyCommand = new ChangeCurrencyCommand(
      transactionRepository,
      sunatAPI,
    );

    const { error } = changeCurrencySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const response = await changeCurrencyCommand.execute(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    console.log("changeCurrency error:", error.message);
    res.status(500).json({ error: error });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const getTransactionsQuery = new GetTransactionsQuery(
      transactionRepository,
    );

    const { error } = getTransactionsSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fechaInicio, fechaFinal }: any = req.query;
    const transactions = await getTransactionsQuery.execute({
      fechaInicio,
      fechaFinal,
    });
    if (transactions) {
      res.status(200).json(transactions);
    } else {
      res.status(404).json({ error: "Could not find transactions" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Could not retreive transaction" });
  }
};
