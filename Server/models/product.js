const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{ type: String, required: true },
    description: { type: String},
    price:{ type: Number, required: true },
    stock: { type: Number, default: 0},
    category: { type: String },
    img: {
        data: Buffer,
        contentType: String
    },
    Images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Products', productSchema)