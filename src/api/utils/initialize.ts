import dbConnect from "@/api/lib/infrastructure/persistent/mongo/connection";

export const initializeServer = async () => {
  await dbConnect();
};
