import { NextResponse } from 'next/server';
import Auction from '../../../models/Auction';
import connectDB from '../../../utils/connectDB';
import Product from '../../../models/Product';
import nodemailer from 'nodemailer';
import User from '../../../models/User';
import dotenv from 'dotenv';
dotenv.config();

async function sendAuctionEmail(selectedSellers) {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

  try {
      const sellers = await User.find({ _id: { $in: selectedSellers } }).select('email');
      const sellerEmails = sellers.map((seller) => seller.email).filter(Boolean);

      if (sellerEmails.length === 0) {
          console.error('No valid seller emails found');
          return;
      }

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: sellerEmails.join(','),
          subject: 'Auction Invitation: Bidding Now Open for Selected Products',
          html: `
              <p>Dear Seller,</p>
              <p>We are pleased to inform you that an auction involving products you're associated with has officially started.</p>
              <p>You are invited to participate and place your bids on the listed products.</p>
              <p><strong>Details of the Auction:</strong></p>
              <ul>
                  <li>Auction Start Time: ${new Date().toLocaleString()}</li>
                  <li>Auction End Time: ${new Date(new Date().getTime() + 3 * 60 * 1000).toLocaleString()}</li>
              </ul>
              <p>Please ensure that you submit your bids within the auction timeframe.</p>
              <p>For any questions or further details, feel free to reach out to us.</p>
              <p>Best regards,</p>
              <p>Your Auction Team</p>
          `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Auction email sent to sellers');
  } catch (error) {
      console.error('Error fetching seller emails or sending email:', error);
  }
}

export async function POST(req) {
    await connectDB();

    const { buyer, selectedSellers, selectedProducts } = await req.json();

    if (!buyer || selectedSellers.length !== 3 || selectedProducts.length !== 3) {
        return NextResponse.json({ error: 'Invalid auction data' }, { status: 400 });
    }

    try {
        await Product.updateMany(
            { _id: { $in: selectedProducts } },
            { $set: { auctionStatus: true } }
        );
        const auction = await Auction.create({
            buyer,
            sellers: selectedSellers,
            products: selectedProducts,
            bids: [],
            status: 'ongoing',
            startTime: new Date(),
            endTime: new Date(new Date().getTime() + 3 * 60 * 1000), 
        });

        await sendAuctionEmail(selectedSellers);

        return NextResponse.json({ message: 'Auction started successfully', auction }, { status: 201 });
    } catch (error) {
        console.error('Error starting auction:', error);
        return NextResponse.json({ error: 'Select 3 different sellers' }, { status: 500 });
    }
}
