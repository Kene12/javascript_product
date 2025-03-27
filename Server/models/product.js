const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{ type: String, require: true },
    description: { type: String},
    price:{ type: Number, require: true },
    stock: { type: Number, default: 0},
    category: { type: String },
    Images: [{ type: String }],
    craetedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Products', productSchema)