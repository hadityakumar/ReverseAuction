import { NextResponse } from 'next/server';
import Auction from '../../models/Auction';
import connectDB from '../../utils/connectDB';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const buyerId = searchParams.get('buyerId');
  const sellerId = searchParams.get('sellerId');

  if(buyerId){
    try {
      const auctions = await Auction.find({
        // status: 'ongoing',
        buyer: buyerId, 
      })
        .populate('buyer', 'name')
        .populate('sellers', 'name')
        .populate('products', 'name originalPrice')
        .populate('bids.seller', 'name');
  
      return NextResponse.json({ auctions }, { status: 200 });
    } catch (error) {
      console.error('Error fetching auctions:', error);
      return NextResponse.json({ error: 'Failed to fetch auctions' }, { status: 500 });
    }
  }

  else{
    try {
      // Find auctions where the seller is part of the auction's sellers array
      const auctions = await Auction.find({ sellers: sellerId })
        .populate('buyer', 'name') // Populate buyer details (e.g., name)
        .populate('sellers', 'name') // Populate sellers' details (e.g., name)
        .populate('products', 'name originalPrice') // Populate product details (name, price)
        .populate('bids.seller', 'name') // Populate bidder details (name)
        .exec();
  
      if (!auctions || auctions.length === 0) {
        return NextResponse.json({ auctions: [] }, { status: 200 });
      }
  
      return NextResponse.json({ auctions }, { status: 200 });
    } catch (error) {
      console.error('Error fetching auctions:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }

  
}
