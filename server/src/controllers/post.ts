import { Context } from "../index";
import { Request, Response } from "express";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Loaded } from "@mikro-orm/core";

export const GetAllPosts = async (_: Request, res: Response) => {
    const posts = await Context.em!.find(Post, {});
    let postResponse: {
        user: Loaded<User, never> | null;
        id: number;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        title: string;
        content: string;
        userId: number;
        dislikes: number;
        likes: number;
    }[] = [];

    for (let i = 0; i < posts.length; i++) {
        const user = await Context.em!.findOne(User, { id: posts[i].userId });
        postResponse = [...postResponse, { ...posts[i], user }];
    }

    res.json(postResponse);
};

export const GetPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await Context.em!.findOne(Post, { id: parseInt(id) });

    res.json({ post });
};

export const CreatePost = async (req: Request, res: Response) => {
    const { username, title, content } = req.body;

    const user = await Context.em!.findOne(User, { name: username });

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

    const post = Context.em!.create(Post, {
        userId: user!.id,
        title,
        content,
        likes: 0,
        dislikes: 0,
    });

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

export const GetPostID = async (req: Request, res: Response) => {
    const { userId, title } = req.body;

    const post = await Context.em!.findOne(Post, { userId, title });

    if (post === null) {
        res.json({
            errors: [
                {
                    field: "userId, title",
                    message:
                        "A post with the requested properties does not exist",
                },
            ],
        });
        return;
    }
    res.json({ id: post.id });
};

export const LikePost = async (req: Request, res: Response) => {
    const { userId, title } = req.body;

    const post = await Context.em!.findOne(Post, { userId, title });

    if (post === null) {
        res.json({
            errors: [
                {
                    field: "userId, title",
                    message: "That post does not exist",
                },
            ],
        });
        return;
    }

    post!.likes += 1;

    res.json({ post });
};

export const DislikePost = async (req: Request, res: Response) => {
    const { userId, title } = req.body;

    const post = await Context.em!.findOne(Post, { userId, title });

    if (post === null) {
        res.json({
            errors: [
                {
                    field: "userId, title",
                    message: "That post does not exist",
                },
            ],
        });
        return;
    }

    post!.dislikes += 1;

    res.json({ post });
};

export const DeletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    await Context.em!.nativeDelete(Post, { id: parseInt(id) });
    res.json({ status: "successful" });
};
