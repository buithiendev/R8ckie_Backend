"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const configs_application_1 = __importDefault(require("./src/configs/configs.application"));
const PORT = configs_application_1.default.app.port;
app_1.default.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
});
process.on('SIGINT', () => {
    console.log('Exit server express...');
    process.exit();
});
//# sourceMappingURL=server.js.map