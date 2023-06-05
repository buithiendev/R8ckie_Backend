"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'Image';
const COLLECTION_NAME = 'Images';
const imageSchema = new mongoose_1.Schema({
    product_id: { type: String },
    image_url: { type: String, required: true },
    image_file_name: { type: String, required: true },
    position: { type: Number },
    variants_id: { type: [String], default: [] },
}, { timestamps: true, collection: COLLECTION_NAME });
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, imageSchema);
//# sourceMappingURL=image.model.js.map