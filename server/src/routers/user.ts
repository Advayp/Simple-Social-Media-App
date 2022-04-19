import express from "express";
import { GetAllUsers, GetOne, Me, SignUp } from "../controllers/user";

const router = express.Router();

router.get("/all", GetAllUsers);
router.get("/one", GetOne);
router.post("/register", SignUp);
router.get("/me", Me);

export default router;
