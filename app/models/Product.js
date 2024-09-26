import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  originalPrice: Number,
  description: String,
  auctionStatus: { type: Boolean, default: false }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
