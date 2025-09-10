"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostById = exports.getPosts = void 0;
const post_1 = require("../models/post");
const getPosts = async (req, res) => {
    try {
        const { userId } = req.query;
        const condition = userId ? { userId } : {};
        const posts = await post_1.Post.find(condition);
        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts,
            meta: {
                count: posts.length,
                page: 1,
                limit: posts.length / 1,
            },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Server Error",
            error: {
                code: "POSTS_NOT_FOUND",
                details: null,
            },
        });
    }
};
exports.getPosts = getPosts;
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await post_1.Post.findOne({ id });
        // Need to validate whether the id is of a valid post or not
        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            data: post,
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
                code: "POST_NOT_FOUND",
                details: null,
            },
        });
    }
};
exports.getPostById = getPostById;
