"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    UNIVERSITY_STUDENT_PASS: process.env.UNIVERSITY_STUDENT_PASS,
    UNIVERSITY_FACULTY_PASS: process.env.UNIVERSITY_FACULTY_PASS,
    UNIVERSITY_ADMIN_PASS: process.env.UNIVERSITY_ADMIN_PASS,
};
