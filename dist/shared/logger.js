"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf } = winston_1.format;
// Formatter
const myFormat = printf(({ message, label, timestamp }) => {
    return `[${label}] ${message} ${timestamp}`;
});
// Success Logs
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'Success' }), timestamp(), myFormat),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'src', 'logs', 'success', 'success-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '10d',
        }),
    ],
});
exports.logger = logger;
// Error Logs
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'Error' }), timestamp(), myFormat),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'src', 'logs', 'error', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '10d',
        }),
    ],
});
exports.errorLogger = errorLogger;
