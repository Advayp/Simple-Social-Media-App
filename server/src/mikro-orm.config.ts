import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import path from "path";
import { User } from "./Entities/User";
import "dotenv/config";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.ts$/,
    },
    entities: [User],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: "postgresql",
    debug: !__prod__,
    allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
