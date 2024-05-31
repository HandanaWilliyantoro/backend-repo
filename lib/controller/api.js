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
exports.getUsers = exports.updateUsers = void 0;
const ApiError_1 = __importDefault(require("../entities/ApiError"));
const userCollection_1 = require("../repository/userCollection");
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
        const userData = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.data;
        yield (0, userCollection_1.update)(userId, userData);
        res.status(200).json({ statusCode: 200, text: 'User updated' });
    }
    catch (error) {
        res.status(500).json(new ApiError_1.default(500, error.message));
    }
});
exports.updateUsers = updateUsers;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.id;
        const userDoc = yield (0, userCollection_1.retrieve)(userId);
        if (!userDoc) {
            res.status(404).json(new ApiError_1.default(404, 'User not found'));
        }
        else {
            res.status(200).json({ data: userDoc, text: 'get user successful', statusCode: 200 });
        }
    }
    catch (error) {
        res.status(500).json(new ApiError_1.default(500, error.message));
    }
});
exports.getUsers = getUsers;
