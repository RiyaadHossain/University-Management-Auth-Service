"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorMessages = [
        { path: error.path, message: 'Invalid Id' },
    ];
    const statusCode = 400;
    const message = 'Cast Error';
    return { statusCode, message, errorMessages };
};
exports.default = handleCastError;
