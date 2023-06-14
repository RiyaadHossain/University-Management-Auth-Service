"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, resData) => {
    const resBody = {
        success: resData.success,
        message: resData.message,
        meta: resData.meta,
        data: resData.data,
    };
    res.status(resData.statusCode).json(resBody);
};
exports.default = sendResponse;
