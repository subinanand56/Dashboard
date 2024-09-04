import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createExpenseController,
  getAllExpensesController,
  getExpenseAmountByPeriodController,
  getExpensesByBranchController,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add-expense", requireSignIn, createExpenseController);
router.get("/all-expense", getAllExpensesController);
router.get("/all-expense/:branchId", requireSignIn, getExpensesByBranchController);
router.get("/all-expenses/:branchId", getExpenseAmountByPeriodController);

export default router;
