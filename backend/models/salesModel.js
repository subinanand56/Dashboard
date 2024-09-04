import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  branch: {
    type: mongoose.ObjectId,
    ref: 'Branch',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityUnit: {
    type: String,
    default: "ton",
  },
  saleDateTime: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: mongoose.ObjectId,
    ref: 'Product',
    required: true,
  },
},
{ timestamps: true }
);



export default mongoose.model("Sales", saleSchema);
