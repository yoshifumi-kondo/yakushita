import { ENV_KEY, getEnvValue } from "@/utils/geEnv";
import mongoose from "mongoose";

export class MongoDBService {
  private instance: mongoose.Connection | null = null;

  public async connect(): Promise<void> {
    if (!this.instance) {
      console.debug("MongoDB connection initializing");
      const mongoDBUrl = getEnvValue(ENV_KEY.MONGODB_URL);
      try {
        await mongoose.connect(mongoDBUrl);
        this.instance = mongoose.connection;
        this.instance.on(
          "error",
          console.error.bind(console, "MongoDB connection error:")
        );
        this.instance.once("open", () => {
          console.info("MongoDB connection successful");
        });
      } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
      }
    }
  }
}
