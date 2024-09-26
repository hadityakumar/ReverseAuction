import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sellers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  bids: [
    {
      seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: Number,
      time: { type: Date, default: Date.now },
    },
  ],
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  startTime: Date,
  endTime: Date,
});

const Auction = mongoose.models.Auction || mongoose.model('Auction', auctionSchema);
export default Auction;
