"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPost = exports.CreatePost = exports.GetPost = exports.GetAllPosts = void 0;
const index_1 = require("../index");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const GetAllPosts = async (_, res) => {
    const posts = await index_1.Context.em.find(Post_1.Post, {});
    res.json({ posts });
};
exports.GetAllPosts = GetAllPosts;
const GetPost = async (req, res) => {
    const { id } = req.params;
    const post = await index_1.Context.em.findOne(Post_1.Post, { id: parseInt(id) });
    res.json({ post });
};
exports.GetPost = GetPost;
const CreatePost = async (req, res) => {
    const { id, title, content } = req.body;
    const user = await index_1.Context.em.findOne(User_1.User, { id });
    const post = index_1.Context.em.create(Post_1.Post, { userId: id, title, content });
    await index_1.Context.em.persistAndFlush(post);
    res.json({ post, user });
};
exports.CreatePost = CreatePost;
const EditPost = async (req, res) => {
    var _a;
    const { userId, postId, newTitle, newContent } = req.body;
    const post = await index_1.Context.em.findOne(Post_1.Post, { id: postId });
    if (post.userId !== userId) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "Invalid user identification",
                },
            ],
        });
    }
    post.content = newContent;
    post.title = newTitle;
    await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.flush());
    res.json({ post });
};
exports.EditPost = EditPost;
//# sourceMappingURL=post.js.map