"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: "User Signed Up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User Already Exists"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, title } = req.body;
    try {
        yield db_1.ContentModel.create({
            title: title,
            link: link,
            // @ts-ignore   
            userId: req.userId,
            tags: []
        });
        res.status(200).json({ message: "Content Added" });
    }
    catch (e) {
        console.log("Error Adding Content", e);
        res.status(500).json({ message: "Error Adding Content" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore   
    const userId = req.userId;
    try {
        const content = yield db_1.ContentModel.find({ userId: userId }).populate("userId", "username");
        res.status(200).json(content);
    }
    catch (e) {
        console.log("Error Fetching Content", e);
        res.status(500).json({ message: "Error Fetching Content" });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.id;
    try {
        yield db_1.ContentModel.deleteMany({
            contentId,
            //@ts-ignore    
            userId: req.userId
        });
        res.status(200).json({ message: "Content Deleted" });
    }
    catch (e) {
        console.log("Error Deleting Content", e);
        res.status(500).json({ message: "Error Deleting Content" });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    const existingLink = yield db_1.LinkModel.findOne({
        // @ts-ignore       
        userId: req.userId
    });
    if (existingLink) {
        res.json({
            link: existingLink.hash
        });
        return;
    }
    if (share) {
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            hash: hash,
            // @ts-ignore   
            userId: req.userId,
        });
        res.json({
            hash: hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            // @ts-ignore   
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash: hash
    });
    if (!link) {
        res.status(411).json({
            message: "Invalid Link"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found"
        });
        return;
    }
    res.status(200).json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
