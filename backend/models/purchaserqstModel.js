import mongoose from "mongoose";

const purchaserqstSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.ObjectId,
      ref: "Branch",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    accepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const PurchaseRequest = mongoose.model("PurchaseRequest", purchaserqstSchema);

export default PurchaseRequest;
