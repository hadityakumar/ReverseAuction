import { NextResponse } from 'next/server';
import connectDB from '../../utils/connectDB';
import Auction from '../../models/Auction';
import Product from '../../models/Product';

export async function POST(req) {
  await connectDB();

  try {
    const { auctionId } = await req.json();

    const auction = await Auction.findById(auctionId).populate('products');
    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
    }

    if (auction.status === 'ongoing') {
      auction.status = 'completed';
      await auction.save();

      await Promise.all(
        auction.products.map(async (product) => {
          product.auctionStatus = false;
          await product.save();
        })
      );

      return NextResponse.json({ message: 'Auction and products updated successfully' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Auction already completed' }, { status: 400 });
  } catch (error) {
    console.error('Error updating auction status:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
