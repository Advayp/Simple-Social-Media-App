import express from "express";
import {
    GetAllPosts,
    GetPost,
    CreatePost,
    EditPost,
    LikePost,
    DislikePost,
    DeletePost,
    RemoveLike,
    RemoveDislike,
} from "../controllers/post";

const router = express.Router();

router.get("/all", GetAllPosts);
router.get("/one/:id", GetPost);
router.get("/delete/:id", DeletePost);
router.post("/create", CreatePost);
router.post("/edit", EditPost);
router.post("/like", LikePost);
router.post("/dislike", DislikePost);
router.post("/remove/like", RemoveLike);
router.post("/remove/dislike", RemoveDislike);

export default router;
