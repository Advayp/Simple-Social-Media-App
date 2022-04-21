import { Context } from "../index";
import { Request, Response } from "express";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

export const GetAllPosts = async (_: Request, res: Response) => {
    const posts = await Context.em!.find(Post, {});
    res.json({ posts });
};

export const GetPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await Context.em!.findOne(Post, { id: parseInt(id) });

    res.json({ post });
};

export const CreatePost = async (req: Request, res: Response) => {
    const { id, title, content } = req.body;

    const user = await Context.em!.findOne(User, { id });

    const post = Context.em!.create(Post, { userId: id, title, content });

    await Context.em!.persistAndFlush(post);

    res.json({ post, user });
};

export const EditPost = async (req: Request, res: Response) => {
    const { userId, postId, newTitle, newContent } = req.body;

    const post = await Context.em!.findOne(Post, { id: postId });

    if (post!.userId !== userId) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "Invalid user identification",
                },
            ],
        });
    }

    post!.content = newContent;
    post!.title = newTitle;

    await Context.em?.flush();

    res.json({ post });
};