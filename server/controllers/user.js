import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = hashPassword(req.body.password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("req.user=", req.user);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// utils functions

function hashPassword(passwordText) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwordText, salt);
  return hash;
}
