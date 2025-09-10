"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../../../controllers/postController");
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
const router = (0, express_1.Router)();
router.get("/", postController_1.getPosts);
router.get("/:id", postController_1.getPostById);
router.use("/:id/comments", commentRoutes_1.default);
exports.default = router;
