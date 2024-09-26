import { NextResponse } from 'next/server';
import Auction from '../../../models/Auction';
import connectDB from '../../../utils/connectDB';
import Product from '../../../models/Product';

export async function POST(req) {
  await connectDB();

  const { buyer, selectedSellers, selectedProducts } = await req.json();

  if (!buyer || selectedSellers.length !== 3 || selectedProducts.length !== 3) {
    return NextResponse.json({ error: 'Invalid auction data' }, { status: 400 });
  }

  try {
    // Set auctionStatus to true for all selected products
    await Product.updateMany(
      { _id: { $in: selectedProducts } },
      { $set: { auctionStatus: true } }
    );

    // Create the auction in the database
    const auction = await Auction.create({
      buyer,
      sellers: selectedSellers,
      products: selectedProducts,
      bids: [],
      status: 'ongoing',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 3 * 60 * 1000), // 3 minutes later
    });
    
    return NextResponse.json({ message: 'Auction started successfully', auction }, { status: 201 });
  } catch (error) {
    console.error('Error starting auction:', error);
    return NextResponse.json({ error: 'Select 3 different sellers' }, { status: 500 });
  }
}
