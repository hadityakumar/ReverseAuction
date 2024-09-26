// app/api/sellerproducts/add/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../utils/connectDB';
import Product from '../../../models/Product';
import User from '../../../models/User';

export async function POST(req) {
  await connectDB();

  try {
    const { sellerId, name, originalPrice, description } = await req.json();

    if (!sellerId || !name || !originalPrice || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const seller = await User.findById(sellerId);
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const newProduct = new Product({
      seller: sellerId,
      name,
      originalPrice,
      description,
    });

    await newProduct.save();

    seller.registeredProducts.push(newProduct._id);
    await seller.save();

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}



