import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { PORT } from "./constants";
import userRouter from "./routers/user";
import { MyContext } from "./types";
import session from "express-session";
import postRouter from "./routers/post";

export const Context: MyContext = {
    em: undefined,
};

const main = async () => {
    const app = express();
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/post", postRouter);
    app.use(
        session({
            secret: process.env.COOKIE_SECRET ?? "your mom",
            resave: false,
            saveUninitialized: false,
        })
    );
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
