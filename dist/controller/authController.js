"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_json_1 = __importDefault(require("../config/auth.json"));
const UserModel = user_1.User;
const router = express_1.default.Router();
router.post("/register", async (req, res) => {
    const { email } = req.body;
    if (await UserModel.findOne({ email })) {
        return res.status(400).json({
            error: true,
            message: "Email já existente! Insira um novo email vá lá pae"
        });
    }
    const UserCreat = await UserModel.create(req.body);
    UserCreat.password = typeof undefined;
    const token = jsonwebtoken_1.default.sign({
        id: UserCreat.id,
        name: UserCreat.name
    }, auth_json_1.default.secret, {
        expiresIn: 86400
    });
    return res.json({
        UserCreat,
        token
    });
});
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "Usuario não encontrado"
        });
    }
    if (!await bcryptjs_1.default.compare(password, user.password)) {
        return res.status(400).send({
            error: true,
            message: "Senha inválida"
        });
    }
    user.password = typeof undefined;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name
    }, auth_json_1.default.secret, {
        expiresIn: 86400
    });
    return res.json({
        user,
        token
    });
});
module.exports = router;
