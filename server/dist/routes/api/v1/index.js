"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postRoutes_1 = __importDefault(require("./postRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const todoRoutes_1 = __importDefault(require("./todoRoutes"));
const router = (0, express_1.Router)();
router.use("/posts", postRoutes_1.default);
router.use("/users", userRoutes_1.default);
router.use("/todos", todoRoutes_1.default);
exports.default = router;
