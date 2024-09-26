import { NextResponse } from 'next/server';
import Product from '@/app/models/Product';
import User from '@/app/models/User';
import connectDB from '../../utils/connectDB';

export async function DELETE(req) {
  await connectDB();
  
  const { productId, sellerId } = await req.json();
  
  try {
    // Find and delete the product
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Remove product from the seller's registered products
    await User.updateOne(
      { _id: sellerId },
      { $pull: { registeredProducts: productId } }
    );

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
