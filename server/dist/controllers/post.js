"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePost = exports.DislikePost = exports.LikePost = exports.GetPostID = exports.EditPost = exports.CreatePost = exports.GetPost = exports.GetAllPosts = void 0;
const index_1 = require("../index");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const user_1 = require("./user");
const GetAllPosts = async (_, res) => {
    const posts = await index_1.Context.em.find(Post_1.Post, {});
    let postResponse = [];
    for (let i = 0; i < posts.length; i++) {
        const user = await index_1.Context.em.findOne(User_1.User, { id: posts[i].userId });
        postResponse = [...postResponse, Object.assign(Object.assign({}, posts[i]), { user })];
    }
    res.json(postResponse);
};
exports.GetAllPosts = GetAllPosts;
const GetPost = async (req, res) => {
    const { id } = req.params;
    const post = await index_1.Context.em.findOne(Post_1.Post, { id: parseInt(id) });
    res.json({ post });
};
exports.GetPost = GetPost;
const CreatePost = async (req, res) => {
    const { username, title, content } = req.body;
    const user = await index_1.Context.em.findOne(User_1.User, { name: username });
    if (user === null) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "Invalid username",
                },
            ],
        });
    }
    const post = index_1.Context.em.create(Post_1.Post, {
        userId: user.id,
        title,
        content,
        likes: 0,
        dislikes: 0,
    });
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
const GetPostID = async (req, res) => {
    const { userId, title } = req.body;
    const post = await index_1.Context.em.findOne(Post_1.Post, { userId, title });
    if (post === null) {
        res.json({
            errors: [
                {
                    field: "userId, title",
                    message: "A post with the requested properties does not exist",
                },
            ],
        });
        return;
    }
    res.json({ id: post.id });
};
exports.GetPostID = GetPostID;
const LikePost = async (req, res) => {
    var _a;
    const { username, title } = req.body;
    const postCreator = await index_1.Context.em.findOne(User_1.User, { name: username });
    const user = await index_1.Context.em.findOne(User_1.User, { id: user_1.MySession.user.id });
    const post = await index_1.Context.em.findOne(Post_1.Post, {
        userId: postCreator.id,
        title,
    });
    if (post === null) {
        res.json({
            errors: [
                {
                    field: "username, title",
                    message: "That post does not exist",
                },
            ],
        });
        return;
    }
    post.likes += 1;
    (_a = user.likedPosts) === null || _a === void 0 ? void 0 : _a.push(post.id);
    res.json({ post });
};
exports.LikePost = LikePost;
const DislikePost = async (req, res) => {
    var _a;
    const { username, title } = req.body;
    const postCreator = await index_1.Context.em.findOne(User_1.User, { name: username });
    const user = await index_1.Context.em.findOne(User_1.User, { id: user_1.MySession.user.id });
    if (user === null) {
        res.json({
            errors: [
                {
                    field: "N/A",
                    message: "No user is currently logged in",
                },
            ],
        });
        return;
    }
    const post = await index_1.Context.em.findOne(Post_1.Post, {
        userId: postCreator.id,
        title,
    });
    if (post === null) {
        res.json({
            errors: [
                {
                    field: "username, title",
                    message: "That post does not exist",
                },
            ],
        });
        return;
    }
    post.dislikes += 1;
    (_a = user.dislikedPosts) === null || _a === void 0 ? void 0 : _a.push(post.id);
    await index_1.Context.em.persistAndFlush(post);
    await index_1.Context.em.persistAndFlush(user);
    res.json({ post });
};
exports.DislikePost = DislikePost;
const DeletePost = async (req, res) => {
    const { id } = req.params;
    await index_1.Context.em.nativeDelete(Post_1.Post, { id: parseInt(id) });
    res.json({ status: "successful" });
};
exports.DeletePost = DeletePost;
//# sourceMappingURL=post.js.map