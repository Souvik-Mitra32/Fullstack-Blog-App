"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../../../controllers/commentController");
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", commentController_1.getCommentsbyPostId);
exports.default = router;
