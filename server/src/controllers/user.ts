import { Request, Response } from "express";
import { User } from "../entities/User";
import { Context } from "../index";
import argon2 from "argon2";
import { Session, SessionData } from "express-session";

declare module "express-session" {
    export interface SessionData {
        user: User | null;
    }
}

var session: Session & Partial<SessionData>;

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

    session = req.session;

    console.log(req.body);

    const existingUser = await Context.em?.findOne(User, { name });

    if (existingUser !== null) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "Username already exists.",
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
                    message: "Username is too short",
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
                    message: "Password is too short",
                },
            ],
        });
        return;
    }

    const hashedPassword = await argon2.hash(password);

    const user = Context.em!.create(User, {
        name,
        password: hashedPassword,
        badge: "New",
    });

    await Context.em!.persistAndFlush(user);

    session = req.session;
    session.user = user;

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
                    message: "Invalid username or password",
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
                    message: "Invalid username or password",
                },
            ],
        });
        return;
    }

    session = req.session;
    session.user = user;

    res.json({
        successful: true,
        name: user.name,
    });
};

export const Me = async (_: Request, res: Response) => {
    res.json({ user: session ? session.user : null, stuff: "stuff" });
};

export const Logout = async (_: Request, res: Response) => {
    session.user = null;
    res.json({ status: "successful" });
};
