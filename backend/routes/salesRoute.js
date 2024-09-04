import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createSalesController,
  getAllSalesAmountByDayController,
  getAllSalesController,
  getMonthlySalesAmountController,
  getSalesAmountByPeriodController,
  getSalesByBranchController,
  getYearlySalesAmountController,
} from "../controllers/salesController.js";

const router = express.Router();


router.post("/add-sale", requireSignIn, createSalesController);
router.get("/all-sale", getAllSalesController);
router.get("/all-sale/:branchId", requireSignIn, getSalesByBranchController);
router.get("/all-sales/:branchId/day", requireSignIn, getAllSalesAmountByDayController);
router.get("/all-sales/:branchId/month", requireSignIn,getMonthlySalesAmountController);
router.get("/all-sales/:branchId/year", requireSignIn,getYearlySalesAmountController);
router.get("/all-sales/:branchId", getSalesAmountByPeriodController);


export default router;
