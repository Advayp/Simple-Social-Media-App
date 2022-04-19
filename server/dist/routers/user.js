"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/all", user_1.GetAllUsers);
router.get("/one", user_1.GetOne);
router.post("/register", user_1.SignUp);
router.get("/me", user_1.Me);
exports.default = router;
//# sourceMappingURL=user.js.map