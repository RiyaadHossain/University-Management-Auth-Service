"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { errorLogger, logger } from './shared/logger'
// Uncaught Execption: Gracefully off the server
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
// Connect Database
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => console.log('Database connceted successfully ✅'))
    .catch(err => console.log(`Unable to connect MongoDB ❌ ${err}`));
// Listen to Server
const server = app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Application is listening ✅`);
});
// Unhandled Rejection: Gracefully off the server
process.on('unhandledRejection', error => {
    console.log(`Unhandled Reject is closing the server ❌ ${error}`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// SIGTERM
process.on('SIGTERM', () => {
    console.log('Sigterm is triggered ⚒️');
    if (server)
        server.close();
});
