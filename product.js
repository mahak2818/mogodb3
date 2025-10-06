const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    required: true, 
    enum: ['Electronics', 'Apparel', 'Footwear', 'Fitness', 'Accessories'] 
  },
  description: { type: String, trim: true },
  variants: [variantSchema]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
