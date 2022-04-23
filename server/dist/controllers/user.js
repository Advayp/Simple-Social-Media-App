"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Me = exports.Login = exports.SignUp = exports.GetOne = exports.GetAllUsers = void 0;
const User_1 = require("../entities/User");
const index_1 = require("../index");
const argon2_1 = __importDefault(require("argon2"));
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
    console.log(req.body);
    const existingUser = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { name }));
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
    const hashedPassword = await argon2_1.default.hash(password);
    const user = index_1.Context.em.create(User_1.User, { name, password: hashedPassword });
    await index_1.Context.em.persistAndFlush(user);
    req.session.user = user;
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
                    message: "incorrect username",
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
exports.Login = Login;
const Me = async (req, res) => {
    res.json({ user: req.session.user });
};
exports.Me = Me;
//# sourceMappingURL=user.js.map