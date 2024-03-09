import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  auth: {
    google: {
      id: {
        type: String,
        required: true,
      },
    },
  },
});
