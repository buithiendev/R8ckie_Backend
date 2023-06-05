"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebase_config_1 = require("../configs/firebase.config");
class Firebase {
    constructor() {
        this.connectStorage = () => {
            const app = (0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
            Firebase.storage = (0, storage_1.getStorage)(app);
        };
        this.getDownloadURL = (folderName, fileName) => {
            const path = folderName + '/' + fileName;
            const downloadRef = (0, storage_1.ref)(Firebase.storage, path);
            return (0, storage_1.getDownloadURL)(downloadRef);
        };
        this.addImage = (folderName, file) => {
            const storageRef = (0, storage_1.ref)(Firebase.storage, folderName);
            return (0, storage_1.uploadBytes)(storageRef, file);
        };
        this.deleteImage = (folderName, nameImage) => {
            const path = folderName + '/' + nameImage;
            const desertRef = (0, storage_1.ref)(Firebase.storage, path);
            return (0, storage_1.deleteObject)(desertRef);
        };
        this.connectStorage();
    }
}
Firebase.getInstance = () => {
    if (!Firebase.instance) {
        Firebase.instance = new Firebase();
    }
    return Firebase.instance;
};
exports.default = Firebase.getInstance();
//# sourceMappingURL=init.firebase.js.map