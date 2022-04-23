import express from "express";
import { GetAllUsers, GetOne, Me, SignUp } from "../controllers/user";
import csurf from "csurf";

const router = express.Router();

router.get("/all", csurf, GetAllUsers);
router.get("/one", csurf, GetOne);
router.post("/register", csurf, SignUp);
router.get("/me", csurf, Me);

export default router;
