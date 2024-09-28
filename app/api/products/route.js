import { NextResponse } from 'next/server';
import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find().populate('seller', 'name');
    
    const response = NextResponse.json({ products });
    
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
