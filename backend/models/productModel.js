const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, // Consider specifying types within the array
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true }, // Same here
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel; // Use CommonJS export
