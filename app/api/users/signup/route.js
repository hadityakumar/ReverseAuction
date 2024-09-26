import { NextResponse } from 'next/server';
import User from '../../../models/User';
import connectDB from '../../../utils/connectDB';

export async function POST(req) {
  await connectDB();
  const { name, email, password, userType } = await req.json();

  try {
    const user = await User.create({
      name,
      email,
      password,
      userType,
      registeredProducts: [] 
    });
    console.log("I created this user ", user.name);
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {

    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
