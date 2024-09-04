import expenseModel from "../models/expenseModel.js";


export const createExpenseController = async (req, res) => {
    try {
      const { expenseName, branch, amount} = req.body;
  
      if (!branch) {
        return res.status(400).json({ success: false, error: "Branch is required" });
      }
  
      if (!expenseName) {
        return res.status(400).json({ success: false, error: "Product Name is required" });
      }
  
      if (!amount) {
        return res.status(400).json({ success: false, error: "Amount is required" });
      }

  
      const expense = await new expenseModel({
        expenseName,
        branch,
        amount,
        
      }).save();
  
      res.status(201).json({
        success: true,
        message: "New Expense created",
        expense,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error in creating Expense",
      });
    }
  };



// Controller to get all expenses
export const getAllExpensesController = async (req, res) => {
  try {
    const expenses = await expenseModel.find().populate("branch"); 
    res.status(200).json({
      success: true,
      message: "All expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching expenses",
    });
  }
};


// Controller to get expenses by branch
export const getExpensesByBranchController = async (req, res) => {
  try {
    const { branchId } = req.params; 

    const expenses = await expenseModel.find({ branch: branchId });

    res.status(200).json({
      success: true,
      message: `Expenses for branch ${branchId} fetched successfully`,
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in fetching expenses by branch",
    });
  }
};


export const getExpenseAmountByPeriodController = async (req, res) => {
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

    const expenses = await expenseModel.find({
      ...branchQuery,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.status(200).json({
      success: true,
      message: `Total expenses amount for branch ${branchId} in ${year}-${month}-${day} fetched successfully`,
      totalExpenseAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Error in fetching total expenses amount by branch in the specified period`,
    });
  }
};
