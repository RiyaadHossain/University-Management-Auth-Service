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
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const express_1 = __importDefault(require("express"));
const user_utils_1 = require("./app/modules/user/user.utils");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application Route
app.use('/api/v1/', routes_1.applicationRoutes);
// Health Check
app.get('/', (req, res) => {
    res.send('Hello World from University Management!');
});
// Global Error Hanlder
app.use(globalErrorHandler_1.default);
// Not Found API Error
app.use((req, res, next) => {
    res.status(http_status_codes_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found!',
        errorMessages: [{ path: req.originalUrl, message: 'API Not Found!' }],
    });
    next();
});
const testGenerateId = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_utils_1.generateFacultyId)();
});
testGenerateId();
exports.default = app;
