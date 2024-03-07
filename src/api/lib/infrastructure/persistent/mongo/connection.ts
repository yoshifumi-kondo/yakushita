import mongoose from "mongoose";

export class MongoDBConnection {
  private static instance: mongoose.Connection | null = null;

  private constructor() {}

  public static async init(): Promise<void> {
    if (!this.instance) {
      console.debug("MongoDB connection initializing");
      const mongoDBUrl = process.env.MONGODB_URL!!;
      await mongoose.connect(mongoDBUrl);
      this.instance = mongoose.connection;
      this.instance.on(
        "error",
        console.error.bind(console, "MongoDB connection error:")
      );
      this.instance.once("open", () => {
        console.log("MongoDB connection successful");
      });
    }
  }
}
