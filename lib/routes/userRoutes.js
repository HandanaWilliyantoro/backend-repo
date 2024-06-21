"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.put('/update-user-data', authMiddleware_1.default, api_1.updateUsers);
router.get('/fetch-user-data', api_1.getUsers);
router.post('/claim-token', api_1.claimToken);
exports.default = router;
