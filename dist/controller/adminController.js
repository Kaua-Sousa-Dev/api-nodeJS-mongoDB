"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/users", (req, res) => {
    console.log("controller");
    return res.json({});
});
module.exports = router;
