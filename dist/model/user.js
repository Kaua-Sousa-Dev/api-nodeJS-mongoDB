"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const database_mongo_1 = __importDefault(require("../database/database-mongo"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now }
});
userSchema.pre("save", async function (next) {
    const hash = await bcryptjs_1.default.hash(this.password, 10);
    this.password = hash;
});
exports.User = database_mongo_1.default.model('User', userSchema);
