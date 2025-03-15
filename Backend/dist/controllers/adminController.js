import User from "../models/user.js";
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "error in geting all users" });
    }
};
export const createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await User.create({ userName, password, email });
        res.status(200).json(user);
    }
    catch (error) {
        console.log("error found in creating user", error);
        res.status(500).json({ message: "Server error", error });
    }
};
export const updateUser = async (req, res) => {
    try {
        const newData = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, newData, {
            new: true,
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "user deleted sucsess fully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
