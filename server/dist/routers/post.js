"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllers/post");
const router = express_1.default.Router();
router.get("/all", post_1.GetAllPosts);
router.get("/one/:id", post_1.GetPost);
router.post("/create", post_1.CreatePost);
router.post("/edit", post_1.EditPost);
exports.default = router;
//# sourceMappingURL=post.js.map