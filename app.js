const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

async function runQueries() {
  try {
    await Product.deleteMany({});

    await Product.insertMany([
      {
        name: "Winter Jacket",
        price: 200,
        category: "Apparel",
        description: "Warm and stylish winter jacket for cold weather",
        variants: [
          { color: "Black", size: "S", stock: 8 },
          { color: "Gray", size: "M", stock: 12 }
        ]
      },
      {
        name: "Smartphone",
        price: 699,
        category: "Electronics",
        description: "Latest model smartphone with advanced features",
        variants: []
      },
      {
        name: "Running Shoes",
        price: 120,
        category: "Footwear",
        description: "Comfortable running shoes for daily exercise",
        variants: [
          { color: "Red", size: "M", stock: 10 },
          { color: "Blue", size: "L", stock: 5 }
        ]
      }
    ]);

    console.log("\n=== All Products ===");
    console.log(await Product.find());

    console.log("\n=== Electronics Products ===");
    console.log(await Product.find({ category: 'Electronics' }));

    console.log("\n=== Products with Blue Variants ===");
    console.log(await Product.find({ 'variants.color': 'Blue' }));

    console.log("\n=== Products with Total Stock ===");
    console.log(await Product.aggregate([
      { $project: { 
          name: 1, 
          totalStock: { $sum: "$variants.stock" },
          variantCount: { $size: "$variants" } 
      }}
    ]));

  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

runQueries();
