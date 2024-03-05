import mongoose from "mongoose";

const mongoDBUrl = process.env.MONGODB_URL!!;

mongoose
  .connect(mongoDBUrl)
  .then(() => console.log("MongoDB connection successful"))
  .catch((error) => console.error("MongoDB connection error:", error));

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
