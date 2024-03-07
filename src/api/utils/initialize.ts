import { MongoDBConnection } from "@/api/lib/infrastructure/persistent/mongo/connection";

export const initialize = async () => {
  await MongoDBConnection.init();
};
