import { Request, Response } from "express";
import { User } from "../entities/User";
import { Context } from "../index";
import argon2 from "argon2";

declare module "express-session" {
    export interface SessionData {
        user: User | null;
    }
}

export const GetAllUsers = async (_: Request, res: Response) => {
    const users = await Context.em?.find(User, {});
    res.json(users);
};

export const GetOne = async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = await Context.em?.findOne(User, { name });
    res.json({ user });
};

export const SignUp = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    const existingUser = await Context.em?.findOne(User, { name });

    if (existingUser !== null) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "that username already exists",
                },
            ],
        });
        return;
    }

    if (name.length <= 3) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "username is too short",
                },
            ],
        });
        return;
    }
    if (password.length <= 3) {
        res.json({
            errors: [
                {
                    field: "password",
                    message: "password is too short",
                },
            ],
        });
        return;
    }

    const hashedPassword = await argon2.hash(password);

    const user = Context.em!.create(User, { name, password: hashedPassword });

    await Context.em!.persistAndFlush(user);

    req.session.user = user;

    res.json({ name: user.name });
};

export const Login = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    const user = await Context.em!.findOne(User, { name });

    if (user === null) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "incorrect username",
                },
            ],
        });
        return;
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
        res.json({
            errors: [
                {
                    field: "password",
                    message: "incorrect password",
                },
            ],
        });
        return;
    }

    req.session.user = user;

    res.json({
        successful: true,
        name: user.name,
    });
};

export const Me = async (req: Request, res: Response) => {
    res.json({ user: req.session.user });
};
