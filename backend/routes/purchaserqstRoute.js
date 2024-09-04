import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createPurchaserqstController,
  getAllPurchaseRequestsAdminByBranchController,
  getAllPurchaseRequestsAdminController,
  getAllPurchaseRequestsByBranchController,
  getAllPurchaseRequestsController,
  getPurchaseAmountByPeriodController,
  purchaseRequestsPhotoController,
  updatePurchaseRequestsController,
} from "../controllers/purchaserqstController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/add-purchaserqst",
  requireSignIn,
  formidable(),
  createPurchaserqstController
);
router.get("/all-purchase-requests", getAllPurchaseRequestsController);
router.get("/all-purchase-requests/:branchId", getAllPurchaseRequestsByBranchController);
router.get("/admin-purchase-requests", getAllPurchaseRequestsAdminController);
router.get("/admin-purchase-requests/:branchId", getAllPurchaseRequestsAdminByBranchController);
router.get("/all-purchase/:branchId", getPurchaseAmountByPeriodController);
router.get(
  "/purchase-photo/:id",
  requireSignIn,
  purchaseRequestsPhotoController
);
router.put(
  "/update-purchase/:id",
  requireSignIn,
  updatePurchaseRequestsController
);


export default router;
