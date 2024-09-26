import { NextResponse } from 'next/server';
import connectDB from '../../../utils/connectDB';
import Auction from '../../../models/Auction';

export async function POST(req) {
  await connectDB();

  try {
    const { auctionId, sellerId, bidAmount } = await req.json();

    if (!auctionId || !sellerId || !bidAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const auction = await Auction.findById(auctionId);
    if (!auction || auction.status === 'completed') {
      return NextResponse.json({ error: 'Auction not found or already completed' }, { status: 404 });
    }

    // Add the bid to the auction's bids array
    auction.bids.push({ seller: sellerId, amount: bidAmount });
    await auction.save();

    return NextResponse.json({ success: true, auction }, { status: 200 });
  } catch (error) {
    console.error('Error placing bid:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
