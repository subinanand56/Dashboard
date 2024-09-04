import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, productController, singleProductController, updateProductController } from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add-product",  requireSignIn , createProductController);

router.put(
    "/update-product/:id",
    requireSignIn,
    
    updateProductController
  );

  router.get("/get-product", productController);

  router.get("/single-product/:name", singleProductController);


  router.delete(
    "/delete-product/:id",
    requireSignIn,
    deleteProductController
  );

export default router;