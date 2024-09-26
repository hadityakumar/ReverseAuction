import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectDB from '../../../utils/connectDB';
import dotenv from 'dotenv';
dotenv.config();

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    let userType = user.userType;

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = password == user.password;

    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect Password' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(user.userType);
    return NextResponse.json(
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: userType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
