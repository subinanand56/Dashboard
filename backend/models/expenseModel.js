import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.ObjectId,
      ref: "Branch",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    expenseName: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
