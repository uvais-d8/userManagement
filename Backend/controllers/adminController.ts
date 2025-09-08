import { request } from "http";
import User from "../models/user.js";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json({ message: "error in geting all users" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.create({ userName, password, email });
    res.status(200).json(user);
  } catch (error) {
    console.log("error found in creating user", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const newData = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
    
  const {id} = req.params;
  try {
    const user= await User.findByIdAndDelete(id)
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"user deleted sucsess fully"})
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports={
  getUsers,
  createUser,
  updateUser,
  deleteUser
}