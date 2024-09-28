import { NextResponse } from 'next/server';
import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';
import User from '../../models/User';

export const fetchCache = 'force-no-store';

export async function GET() {
  await connectDB();
  
  try {
    const products = await Product.find().populate('seller', 'name');
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
