import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import branchRoutes from "./routes/branchRoute.js";
import salesRoutes from "./routes/salesRoute.js";
import productRoutes from "./routes/productRoute.js";
import purchaserqstRoutes from "./routes/purchaserqstRoute.js";
import expenseRoutes from "./routes/expenseRoute.js";
import cors from "cors";
import mongoose from "mongoose";



dotenv.config();

connectDB();

//reset object
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/purchaserqst", purchaserqstRoutes);
app.use("/api/v1/expense", expenseRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on  ${PORT}`.bgCyan.white);
});



// mongoose.connect(process.env.MONGO_URL).then(()=>{
//   const PORT = process.env.PORT || 8080
//   app.listen(PORT, () => {
//     console.log(`Server Running on  ${PORT}`.bgCyan.white);
//   });
// }).catch(err =>{
//   console.log(err);
// })