"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Me = exports.Login = exports.SignUp = exports.GetOne = exports.GetAllUsers = void 0;
const User_1 = require("../entities/User");
const index_1 = require("../index");
const argon2_1 = __importDefault(require("argon2"));
var session;
const GetAllUsers = async (_, res) => {
    var _a;
    const users = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.find(User_1.User, {}));
    res.json(users);
};
exports.GetAllUsers = GetAllUsers;
const GetOne = async (req, res) => {
    var _a;
    const { name } = req.body;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { name }));
    res.json({ user });
};
exports.GetOne = GetOne;
const SignUp = async (req, res) => {
    var _a;
    const { name, password } = req.body;
    session = req.session;
    console.log(req.body);
    const existingUser = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { name }));
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
    const hashedPassword = await argon2_1.default.hash(password);
    const user = index_1.Context.em.create(User_1.User, { name, password: hashedPassword });
    await index_1.Context.em.persistAndFlush(user);
    session = req.session;
    session.user = user;
    res.json({ name: user.name });
};
exports.SignUp = SignUp;
const Login = async (req, res) => {
    const { name, password } = req.body;
    const user = await index_1.Context.em.findOne(User_1.User, { name });
    if (user === null) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "Invalid Username",
                },
            ],
        });
        return;
    }
    const valid = await argon2_1.default.verify(user.password, password);
    if (!valid) {
        res.json({
            errors: [
                {
                    field: "password",
                    message: "Incorrect password",
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
exports.Login = Login;
const Me = async (_, res) => {
    res.json({ user: session.user, stuff: "stuff" });
};
exports.Me = Me;
const Logout = async (_, res) => {
    session.user = null;
    res.json({ status: "successful" });
};
exports.Logout = Logout;
//# sourceMappingURL=user.js.map