import mongoose from 'mongoose';
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countinstock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numreviews: { type: Number, required: true },
  },
  {
    timestamp: true,
  }
);
const Product = mongoose.model('product', productSchema);
export default Product;
