"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./controller/authController"));
const adminController_1 = __importDefault(require("./controller/adminController"));
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
const authController = authController_1.default;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', authController);
app.use('/admin', authenticate_1.default, adminController_1.default);
app.listen(3001, () => {
    console.log("Running porra");
});
