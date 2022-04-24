"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/me", user_1.Me);
router.get("/logout", user_1.Logout);
router.get("/all", user_1.GetAllUsers);
router.get("/one", user_1.GetOne);
router.post("/login", user_1.Login);
router.post("/register", user_1.SignUp);
exports.default = router;
//# sourceMappingURL=user.js.map