"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://kawan:s7EtS57WgrttpaXr@api-mongo.jdnwfyi.mongodb.net/");
mongoose_1.default.Promise = global.Promise;
module.exports = mongoose_1.default;
