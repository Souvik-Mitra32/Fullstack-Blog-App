"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = void 0;
const todo_1 = require("../models/todo");
const getTodos = async (req, res) => {
    try {
        const { userId } = req.query;
        const condition = userId ? { userId } : {};
        const todos = await todo_1.Todo.find(condition);
        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            data: todos,
            meta: {
                count: todos.length,
                page: 1,
                limit: todos.length / 1,
            },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Server Error",
            error: {
                code: "TODOS_NOT_FOUND",
                details: null,
            },
        });
    }
};
exports.getTodos = getTodos;
