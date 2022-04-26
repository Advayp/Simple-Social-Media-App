import express from "express";
import {
    FetchById,
    GetAllUsers,
    GetOne,
    Login,
    Logout,
    Me,
    SignUp,
} from "../controllers/user";

const router = express.Router();

router.get("/me", Me);
router.get("/logout", Logout);
router.get("/all", GetAllUsers);
router.get("/one", GetOne);
router.get("/fetch/:id", FetchById);
router.post("/login", Login);
router.post("/register", SignUp);

export default router;
