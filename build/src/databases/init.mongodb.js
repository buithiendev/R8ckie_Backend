"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configs_application_1 = __importDefault(require("../configs/configs.application"));
const { database } = configs_application_1.default;
const connectString = database.mongodb.host;
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        if (1 === 1) {
            mongoose_1.default.set('debug', true);
            mongoose_1.default.set('debug', { color: true });
        }
        const options = {
            maxPoolSize: 50,
        };
        mongoose_1.default
            .connect(connectString, options)
            .then(() => {
            console.log('Connect to mongodb successful');
        })
            .catch((error) => {
            console.log('Connect to mongodb failed');
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongoDB = Database.getInstance();
exports.default = instanceMongoDB;
//# sourceMappingURL=init.mongodb.js.map