"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const post_1 = require("../models/post");
const getPosts = async (req, res) => {
    try {
        const { userId, q } = req.query;
        const condition = {};
        // search by keyword
        if (q && typeof q === "string") {
            condition.$or = [
                { title: { $regex: q, $options: "i" } },
                { body: { $regex: q, $options: "i" } },
            ];
        }
        // filter by userId
        if (userId && !isNaN(Number(userId))) {
            condition.userId = Number(userId);
        }
        const posts = await post_1.Post.find(condition).select("-_id");
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
        const post = await post_1.Post.findOne({ id }).select("-_id");
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
const createPost = async (req, res) => {
    try {
        const allPosts = await post_1.Post.find();
        const { title, body, userId } = req.body;
        const newPost = await post_1.Post.create({
            title,
            body,
            userId: Number(userId),
            id: allPosts.length + 1,
        });
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost,
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
                code: "ERROR_CREATING_POST",
                details: null,
            },
        });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, userId } = req.body;
        await post_1.Post.updateOne({ id: Number(id) }, { title, body, userId });
        const updatedPost = await post_1.Post.findOne({ id: Number(id) }).select("-_id");
        return res.status(201).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
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
                code: "ERROR_UPDATING_POST",
                details: null,
            },
        });
    }
};
exports.updatePost = updatePost;
