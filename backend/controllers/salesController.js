import SalesModel from "../models/salesModel.js";

export const createSalesController = async (req, res) => {
  try {
    const { name, branch, amount, quantity, quantityUnit, saleDateTime } =
      req.body;

    if (!branch) {
      return res
        .status(400)
        .json({ success: false, error: "Branch is required" });
    }

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Product Name is required" });
    }

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, error: "Amount is required" });
    }

    if (!quantity) {
      return res
        .status(400)
        .json({ success: false, error: "Quantity is required" });
    }

    const sale = await new SalesModel({
      name,
      branch,
      amount,
      quantity,
      quantityUnit: quantityUnit || "ton",
      saleDateTime: saleDateTime || Date.now(),
    }).save();

    res.status(201).json({
      success: true,
      message: "New Sale created",
      sale,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in creating Sale",
    });
  }
};

export const getAllSalesController = async (req, res) => {
  try {
    const sales = await SalesModel.find()
      .populate("branch")
      .populate("name", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All sales fetched successfully",
      sales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching sales",
    });
  }
};

export const getSalesByBranchController = async (req, res) => {
  try {
    const { branchId } = req.params; 
    const sales = await SalesModel.find({ branch: branchId }).sort({ createdAt: -1 }).populate("name", "name");

    res.status(200).json({
      success: true,
      message: `Sales for branch ${branchId} fetched successfully`,
      sales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching sales by branch",
    });
  }
};

// Fetch sales by day for a specific branch
export const getAllSalesAmountByDayController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { day, month, year } = req.query;

    const sales = await SalesModel.find({
      branch: branchId,
      saleDateTime: {
        $gte: new Date(`${year}-${month}-${day}T00:00:00.000Z`),
        $lt: new Date(`${year}-${month}-${day}T23:59:59.999Z`), 
      },
    });

    const totalSalesAmount = sales.reduce((total, sale) => total + sale.amount, 0);

    res.status(200).json({
      success: true,
      message: `Total sales amount for branch ${branchId} on ${year}-${month}-${day} fetched successfully`,
      totalSalesAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Error in fetching total sales amount by branch on a specific day`,
    });
  }
};


// Fetch sales by month for a specific branch
export const getMonthlySalesAmountController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { year, month } = req.query;

    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)); // Start of the month
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59)); // End of the month

    const sales = await SalesModel.find({
      branch: branchId,
      saleDateTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalSalesAmount = sales.reduce((total, sale) => total + sale.amount, 0);

    res.status(200).json({
      success: true,
      message: `Total sales amount for branch ${branchId} in ${year}-${month} fetched successfully`,
      totalSalesAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Error in fetching total sales amount by branch in a specific month`,
    });
  }
};



// Fetch sales by year for a specific branch

export const getYearlySalesAmountController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { year } = req.query;

    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0)); // Start of the year
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59)); // End of the year

    const sales = await SalesModel.find({
      branch: branchId,
      saleDateTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalSalesAmount = sales.reduce((total, sale) => total + sale.amount, 0);

    res.status(200).json({
      success: true,
      message: `Total sales amount for branch ${branchId} in ${year} fetched successfully`,
      totalSalesAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Error in fetching total sales amount by branch in a specific year`,
    });
  }
};
;

export const getSalesAmountByPeriodController = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { period, year, month, day } = req.query;

    let startDate, endDate;
    let branchQuery = {}; 

    if (branchId !== 'all') { 
      branchQuery = { branch: branchId };
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

    const sales = await SalesModel.find({
      ...branchQuery, 
      saleDateTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalSalesAmount = sales.reduce((total, sale) => total + sale.amount, 0);

    res.status(200).json({
      success: true,
      message: `Total sales amount for branch ${branchId} in ${year}-${month}-${day} fetched successfully`,
      totalSalesAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Error in fetching total sales amount by branch in the specified period`,
    });
  }
};


