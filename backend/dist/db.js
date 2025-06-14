"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://Brain:E4p8dlTxElUN1see@cluster0.kgnmt.mongodb.net/Second-Brain");
const userSchema = new mongoose_2.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    // userid : Number,   
});
const contentSchema = new mongoose_2.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true }
});
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true },
});
exports.userModel = new mongoose_2.model("user", userSchema);
exports.contentModel = new mongoose_2.model("content", contentSchema);
exports.LinkModel = new mongoose_2.model("Links", LinkSchema);
