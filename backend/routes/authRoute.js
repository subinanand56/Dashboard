import express from "express";
import {
  registerController,
  loginController,
  testController,
  userController,
  deleteUserController,
  updateUserController,
} from "../controllers/authController.js";
import { isAdmin, isEmployee, isManager, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController);


router.get("/test", requireSignIn, isAdmin, isEmployee, isManager ,testController);

router.get("/get-users", userController);

router.put(
  "/update-user/:id",
  requireSignIn,
  isAdmin,
  updateUserController
);

router.delete(
  "/delete-user/:id",
  requireSignIn,

  deleteUserController
);


export default router;