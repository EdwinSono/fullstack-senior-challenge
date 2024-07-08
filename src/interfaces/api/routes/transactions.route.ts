import { Router } from "express";
import {
  changeCurrency,
  getTransactions,
} from "../controllers/transactions";

const router = Router();

router.post("/change-currency", changeCurrency);
router.get("/", getTransactions);

export default router;
