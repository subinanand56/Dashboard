import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // branch: {
  //   type: mongoose.ObjectId,
  //   ref: 'Branch',
  //   required: true,
  // },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
  // unit: {
  //   type: String,
  //   required: true,
  //   default: "kg",
  // },
},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);
