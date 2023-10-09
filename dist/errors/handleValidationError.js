"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorMessages = Object.values(error.errors).map(el => {
        return { path: el === null || el === void 0 ? void 0 : el.path, message: el === null || el === void 0 ? void 0 : el.message };
    });
    const statusCode = 400;
    const message = 'Validation Error';
    return { statusCode, message, errorMessages };
};
exports.default = handleValidationError;
