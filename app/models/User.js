import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, enum: ["buyer", "seller"], required: true },
  registeredProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
