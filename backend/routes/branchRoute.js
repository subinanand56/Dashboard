import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  branchController,
  createBranchController,
  deleteBranchController,
  singleBranchController,
  updateBranchController,
} from "./../controllers/branchController.js";


const router = express.Router();

router.post("/create-branch", requireSignIn, isAdmin, createBranchController);

// update branch
router.put(
  "/update-branch/:id",
  requireSignIn,
  isAdmin,
  updateBranchController
);

//getAll branch
router.get("/get-branch", branchController);


//single branch
router.get("/single-branch/:name", singleBranchController);

//delete category
router.delete(
  "/delete-branch/:id",
  requireSignIn,
  isAdmin,
  deleteBranchController
);

export default router;
