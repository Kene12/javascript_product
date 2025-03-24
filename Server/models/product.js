const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{ type: String, require: true },
    price:{ type: Number, require: true },
    idUser:{ type: String, require: true }
})

module.exports = mongoose.model('Products', productSchema)