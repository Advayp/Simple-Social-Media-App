"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
require("dotenv/config");
const Post_1 = require("./entities/Post");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.ts$/,
    },
    entities: [User_1.User, Post_1.Post],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: "postgresql",
    debug: !constants_1.__prod__,
    allowGlobalContext: true,
};
//# sourceMappingURL=mikro-orm.config.js.map