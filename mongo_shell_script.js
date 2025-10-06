use ecommerce

db.products.drop()

db.products.insertMany([
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
])

print("\n=== All Products ===")
db.products.find().pretty()

print("\n=== Electronics Products ===")
db.products.find({ category: "Electronics" }).pretty()

print("\n=== Products with Blue Variants ===")
db.products.find({ "variants.color": "Blue" }).pretty()

print("\n=== Products with Total Stock ===")
db.products.aggregate([
  { 
    $project: { 
      name: 1, 
      totalStock: { $sum: "$variants.stock" }, 
      variantCount: { $size: "$variants" } 
    } 
  }
])
