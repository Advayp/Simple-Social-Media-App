import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import path from "path";
import { User } from "./entities/User";
import "dotenv/config";
import { Post } from "./entities/Post";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.ts$/,
    },
    entities: [User, Post],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: "postgresql",
    debug: !__prod__,
    allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
