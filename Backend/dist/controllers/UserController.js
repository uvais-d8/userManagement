import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTocken from "../utils/genarateToken.js";
export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(email);
    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400).send("User alredy exist");
            return;
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password: hasedPassword,
        });
        console.log("New user is created", user._id);
        if (user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                profileImage: user.profileImage,
                token: generateTocken(user._id, user.isAdmin),
                message: "user created succssfully",
            });
            return;
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error registerig user" });
        return;
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                userName: user.userName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateTocken(user.id, user.isAdmin),
            });
        }
        else {
            res.status(401).json({ message: "Invalid username and password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return;
    }
};
export const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Not authorized' });
            return;
        }
        res.status(200).json({
            success: true,
            data: {
                userName: req.user.userName,
                email: req.user.email,
                profileImage: req.user.profileImage,
                message: "welcome to home page"
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "server error", error });
        return;
    }
};
export const updateProfile = async (req, res) => {
    try {
        const userid = req.user?._id;
        if (!req.file || !req.file.path) {
            res.status(400).json({ message: "no file upload" });
            return;
        }
        const imageurl = req.file.path;
        const user = await User.findByIdAndUpdate(userid, { profileImage: imageurl }, { new: true });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Profile image updated successfully",
            profileImage: imageurl,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
