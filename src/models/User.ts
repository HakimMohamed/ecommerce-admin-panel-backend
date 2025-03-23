// models/User.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUserAddress {
  _id: Types.ObjectId;
  city: string;
  country: string;
  name: { first: string; last: string };
  phone: string;
  postalCode?: string;
  region: string;
  type: 'home' | 'office';
  details: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  name: { first: string; last: string };
  password: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: 'asc',
    },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema, 'Users');

export default User;
