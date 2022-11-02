import { Request, Response } from "express";
import User from "../models/User";

export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({}).sort({ createdAt: -1 });
    return res.status(200).json(allUsers);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const GetUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const SetNewUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const user = await User.create(newUser);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findById(req.params.id);
    if (!updatedUser) {
      return res.status(400).json({ error: "User not found" });
    }

    updatedUser.name = req.body.name;
    updatedUser.email = req.body.email;
    // Object.assign(updatedUser, req.body);
    await updatedUser.save();
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json(deletedUser);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
