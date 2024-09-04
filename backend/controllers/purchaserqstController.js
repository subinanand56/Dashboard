
import PurchaseRequest from "../models/purchaserqstModel.js";
import fs from "fs";

export const createPurchaserqstController = async (req, res) => {
  try {
    const { branch, productName, companyName, price } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !branch:
        return res
          .status(400)
          .json({ success: false, error: "Branch is required" });
      case !productName:
        return res
          .status(400)
          .json({ success: false, error: "Product Name is required" });
      case !companyName:
        return res
          .status(400)
          .json({ success: false, error: "Company Name is required" });
      case !price:
        return res
          .status(400)
          .json({ success: false, error: "Price is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .json({
            success: false,
            error: "Photo is required and should be less than 1MB",
          });
      default:
        const purchaseRequest = new PurchaseRequest({
          ...req.fields,
        });
        if (photo) {
          purchaseRequest.photo.data = fs.readFileSync(photo.path);
          purchaseRequest.photo.contentType = photo.type;
        }
        await purchaseRequest.save();

        res.status(201).json({
          success: true,
          message: "New Purchase Request created",
          purchaseRequest,
        });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in creating Purchase Request",
    });
  }
};

export const getAllPurchaseRequestsController = async (req, res) => {
  try {
    const purchaseRequests = await PurchaseRequest.find()
      .select("-photo")
      .populate("branch")
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: purchaseRequests.length,
      message: "All purchase requests fetched successfully",
      purchaseRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching purchase requests",
    });
  }
};

export const getAllPurchaseRequestsByBranchController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const purchaseRequests = await PurchaseRequest.find({ branch: branchId })
      .select("-photo")
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: purchaseRequests.length,
      message: "All purchase requests fetched successfully",
      purchaseRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching purchase requests",
    });
  }
};

export const updatePurchaseRequestsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { accepted } = req.body;

    // Update the 'accepted' field of the PurchaseRequest
    const updatedPurchaseRequest = await PurchaseRequest.findByIdAndUpdate(
      id,
      { accepted }, // Update the 'accepted' field with the new value
      { new: true }
    );

    if (!updatedPurchaseRequest) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Purchase request status updated successfully',
      updatedPurchaseRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error in updating purchase request status',
    });
  }
};



export const purchaseRequestsPhotoController = async (req, res) => {
  try {
    const purchaseRequest  = await PurchaseRequest.findById(req.params.id).select("photo");
    if (purchaseRequest.photo.data) {
      res.set("Content-type", purchaseRequest.photo.contentType);
      return res.status(200).send(purchaseRequest.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};


export const getAllPurchaseRequestsAdminController = async (req, res) => {
  try {
    const purchaseRequests = await PurchaseRequest.find({ accepted: true }) // Filtering by accepted: true
      .select("-photo")
      .populate("branch")
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: purchaseRequests.length,
      message: "Accepted purchase requests fetched successfully",
      purchaseRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching accepted purchase requests",
    });
  }
};

export const getAllPurchaseRequestsAdminByBranchController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const purchaseRequests = await PurchaseRequest.find({ branch: branchId, accepted: true }) // Filtering by branch and accepted: true
      .select("-photo")
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: purchaseRequests.length,
      message: "Accepted purchase requests fetched successfully for the branch",
      purchaseRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching accepted purchase requests for the branch",
    });
  }
};


export const getPurchaseAmountByPeriodController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { period, year, month, day } = req.query;

    let startDate, endDate;
    let branchQuery = { accepted: true }; 

    if (branchId !== 'all') {
      branchQuery.branch = branchId;
    }

    if (period === 'day') {
      startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);
    } else if (period === 'month') {
      startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
      endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));
    } else if (period === 'year') {
      startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
      endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid period specified. Please use day, month, or year.',
      });
    }

    const purchases = await PurchaseRequest.find({
      ...branchQuery,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalPurchaseAmount = purchases.reduce((total, purchase) => total + parseFloat(purchase.price), 0);

    res.status(200).json({
      success: true,
      message: `Total purchase amount for branch ${branchId} in ${year}-${month}-${day} fetched successfully`,
      totalPurchaseAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Error in fetching total purchase amount by branch in the specified period`,
    });
  }
};

