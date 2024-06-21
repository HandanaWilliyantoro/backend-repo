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
const ApiError_1 = __importDefault(require("../entities/ApiError"));
const firebaseConfig_1 = require("../config/firebaseConfig");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const userId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
    if (!token) {
        return res.status(401).json(new ApiError_1.default(401, 'Authentication token not provided'));
    }
    try {
        const decodedToken = yield firebaseConfig_1.admin.auth().verifyIdToken(token);
        const { role, uid } = decodedToken;
        console.log(role, '<< role');
        if (role === 'admin') {
            req.user = decodedToken;
            return next();
        }
        if (userId === uid) {
            return next();
        }
        res.status(401).json(new ApiError_1.default(401, 'You are not authorized to do this!'));
    }
    catch (error) {
        res.status(500).json(new ApiError_1.default(500, error.message));
    }
});
exports.default = authMiddleware;
