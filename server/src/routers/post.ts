import express from "express";
import {
    GetAllPosts,
    GetPost,
    CreatePost,
    EditPost,
} from "../controllers/post";

const router = express.Router();

router.get("/all", GetAllPosts);
router.get("/one/:id", GetPost);
router.post("/create", CreatePost);
router.post("/edit", EditPost);

export default router;
