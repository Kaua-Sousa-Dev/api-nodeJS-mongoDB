"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_json_1 = __importDefault(require("../config/auth.json"));
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token não providenciado"
        });
    }
    const parts = authHeader.split(" ");
    if (parts.length != 2) {
        return res.status(401).json({
            error: true,
            message: "Token inválido"
        });
    }
    const [scheme, token] = parts;
    if (scheme.indexOf("Bearer") != 0) {
        return res.status(401).json({
            error: true,
            message: "Token mal formatado"
        });
    }
    return jsonwebtoken_1.default.verify(token, auth_json_1.default.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token Inválido/Expirado"
            });
        }
        req.body.userLogged = decoded;
        console.log(err);
        console.log(decoded);
        return next();
    });
};
