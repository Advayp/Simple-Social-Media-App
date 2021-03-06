"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const user_1 = __importDefault(require("./routers/user"));
const express_session_1 = __importDefault(require("express-session"));
const post_1 = __importDefault(require("./routers/post"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.Context = {
    em: undefined,
};
const main = async () => {
    var _a;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    app.use((0, express_session_1.default)({
        secret: (_a = process.env.COOKIE_SECRET) !== null && _a !== void 0 ? _a : "your mom",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
    }));
    app.use("/user", user_1.default);
    app.use("/post", post_1.default);
    app.listen(constants_1.PORT, () => {
        console.log(`Alive on http://localhost:${constants_1.PORT}`);
    });
    app.get("/", (_, res) => {
        res.json({ hello: "bye" });
    });
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    orm.getMigrator().up();
    exports.Context.em = orm.em;
};
main().catch(console.error);
//# sourceMappingURL=index.js.map