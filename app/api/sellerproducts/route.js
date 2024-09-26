import { NextResponse } from 'next/server';
import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export async function GET(req) {
  await connectDB();

  // Get sellerId from the query parameters
  const { searchParams } = new URL(req.url);
  const sellerId = searchParams.get('sellerId');

  try {
    // Fetch products belonging to the specified seller
    const products = await Product.find({ seller: sellerId }).populate('seller', 'name');
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
