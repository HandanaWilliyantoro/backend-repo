"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.admin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const admin = __importStar(require("firebase-admin"));
exports.admin = admin;
dotenv_1.default.config();
// Define your Firebase configuration as a ServiceAccount object
const serviceAccount = {
    projectId: (process.env.PROJECT_ID || ''),
    privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL || '',
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount === null || serviceAccount === void 0 ? void 0 : serviceAccount.projectId}.firebaseio.com`
});
const db = admin.firestore();
exports.db = db;
