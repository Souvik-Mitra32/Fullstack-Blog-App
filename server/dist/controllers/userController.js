"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = void 0;
const user_1 = require("../models/user");
const getUsers = async (req, res) => {
    try {
        const users = await user_1.User.find();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
            meta: {
                count: users.length,
                page: 1,
                limit: users.length / 1,
            },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Server Error",
            error: {
                code: "USERS_NOT_FOUND",
                details: null,
            },
        });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_1.User.findOne({ id });
        // Need to validate whether the id is of a valid user or not
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
            meta: {
                count: 1,
                page: 1,
                limit: 1,
            },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Server Error",
            error: {
                code: "USER_NOT_FOUND",
                details: null,
            },
        });
    }
};
exports.getUserById = getUserById;
