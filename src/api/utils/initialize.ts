import { MongoDBConnection } from "@/api/lib/infrastructure/persistent/mongo/connection";

export const initializeServer = async () => {
  await MongoDBConnection.init();
};
