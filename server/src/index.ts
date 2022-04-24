import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { PORT, __prod__ } from "./constants";
import userRouter from "./routers/user";
import { MyContext } from "./types";
import session from "express-session";
import postRouter from "./routers/post";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export const Context: MyContext = {
    em: undefined,
};

const main = async () => {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
        cors({
            origin: "*",
        })
    );
    app.use(
        session({
            secret: process.env.COOKIE_SECRET ?? "your mom",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__,
            },
        })
    );
    app.use("/user", userRouter);
    app.use("/post", postRouter);
    app.listen(PORT, () => {
        console.log(`Alive on http://localhost:${PORT}`);
    });
    app.get("/", (_, res) => {
        res.json({ hello: "bye" });
    });

    const orm = await MikroORM.init(mikroOrmConfig);
    orm.getMigrator().up();
    Context.em = orm.em;
};

main().catch(console.error);
