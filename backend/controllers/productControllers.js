import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name } = req.body;
    switch (true) {
     
      case !name:
        return res.status(500).send({ error: "Product Name is Required" });
      
    }
    const product = await new productModel({
      name,
     
    }).save();
    res.status(201).send({
      success: true,
      message: "New Product created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Product",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;
    // const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(
      id,
      { name, quantity, unit },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updatingproduct",
    });
  }
};

export const productController = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "All product List",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all  product",
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const name = req.params.name;
    const product = await productModel
      .findOne({
        name,
      })
      .populate("branch");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single product",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting product",
      error,
    });
  }
};
