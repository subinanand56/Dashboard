import userModel from "../models/userModel.js";
import {  comparePassword, hashPassword } from "./../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role , branch} = req.body;
    
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!role) {
      return res.send({ message: "Role is Required" });
    }
    if (!branch) {
      return res.send({ message: "Branch is Required" });
    }

    // const allowedRoles = ['admin', 'employee', 'manager'];
    // if (!allowedRoles.includes(role)) {
    //   return res.status(400).send({ message: "Invalid role specified" });
    // }
    
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      branch,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
          role: user.role,
          branch:user.branch,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };
  

  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

  export const userController = async (req, res) => {
    try {
      const user = await userModel.find();
      res.status(200).send({
        success: true,
        message: "All Employees List",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all Employees",
      });
    }
  };

  export const deleteUserController = async (req, res) => {
    try {
      const { id } = req.params;
      await userModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Employee Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting employee",
        error,
      });
    }
  };

  export const updateUserController = async (req, res) => {
    try {
      const { name, email, password, phone, address, role, branch } = req.body;
      const userId = req.params.id; 
      const existingUser = await userModel.findById(userId);
  
      if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Update the user's information if provided in the request
      if (name) {
        existingUser.name = name;
      }
      if (email) {
        existingUser.email = email;
      }
      if (password) {
        const hashedPassword = await hashPassword(password);
        existingUser.password = hashedPassword;
      }
      if (phone) {
        existingUser.phone = phone;
      }
      if (address) {
        existingUser.address = address;
      }
      if (role) {
        existingUser.role = role;
      }
      if (branch) {
        existingUser.branch = branch;
      }
  
      // Save the updated user
      await existingUser.save();
  
      res.status(200).send({
        success: true,
        message: "User updated successfully",
        user: existingUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error updating user",
        error,
      });
    }
  };
  