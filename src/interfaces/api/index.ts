import MongoDBConnection from "../../infrastructure/database";
import express, { Request, Response, NextFunction, Router } from "express";
import transactionRoute from "./routes/transactions.route";

async function connectDB() {
  const mongoUri: string = process.env.URLDB || "";
  await MongoDBConnection.getInstance().connect(mongoUri);
}

connectDB();

const api = express();
const port = process.env.PORT || 3000;

api.use(express.json());

api.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("API REST: Kambista v1.0");
});

api.use("/transactions", transactionRoute);

api.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

api.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).send();
});

api.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { api };
