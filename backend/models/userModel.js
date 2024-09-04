import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String, 
      default: 'employee', 
    },
    branch: {
      type: mongoose.ObjectId,
      ref: 'Branch',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);