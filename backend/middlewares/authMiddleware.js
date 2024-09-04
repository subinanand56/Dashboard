import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";


export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};



export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };

  export const isEmployee = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 2) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access - Not an Employee",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in employee middleware",
      });
    }
  };



  export const isManager = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 3) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access Not a Manager",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in manager middleware",
      });
    }
  };

  