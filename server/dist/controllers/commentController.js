"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsbyPostId = void 0;
const comment_1 = require("../models/comment");
const getCommentsbyPostId = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const comments = await comment_1.Comment.find({ postId });
        return res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            data: comments,
            meta: {
                count: comments.length,
                page: 1,
                limit: comments.length / 1,
            },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Server Error",
            error: {
                code: "COMMENTS_NOT_FOUND",
                details: null,
            },
        });
    }
};
exports.getCommentsbyPostId = getCommentsbyPostId;
