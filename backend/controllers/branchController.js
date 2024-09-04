import branchModel from "../models/branchModel.js";


export const createBranchController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingBranch = await branchModel.findOne({ name });
    if (existingBranch) {
      return res.status(200).send({
        success: false,
        message: "Branch Already Exisits",
      });
    }
    const branch = await new branchModel({
        name,
      }).save();
      res.status(201).send({
        success: true,
        message: "New branch created",
        branch,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};


export const updateBranchController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const branch = await branchModel.findByIdAndUpdate(
      id,
      { name},
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Branch Updated Successfully",
      branch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating branch",
    });
  }
};

export const branchController = async (req, res) => {
  try {
    const branch = await branchModel.find();
    res.status(200).send({
      success: true,
      message: "All Branches List",
      branch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Branch",
    });
  }
};


export const singleBranchController = async (req, res) => {
  try {
    const name = req.params.name;
    const branch = await branchModel.findOne({
    name });
    res.status(200).send({
      success: true,
      message: "Get Single Branch Successfully",
      branch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Branch",
    });
  }
};

export const deleteBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    await branchModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Branch Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting branch",
      error,
    });
  }
};