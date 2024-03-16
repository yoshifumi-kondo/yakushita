import { DatabaseError } from "@/api/error";
import { MongoDBService } from "@/api/lib/infrastructure/persistent/mongo/Service";
export abstract class BaseRepository {
  protected mongoDBService: MongoDBService;

  constructor() {
    this.mongoDBService = new MongoDBService();
  }

  protected async performDbOperation<T>(
    operation: () => Promise<T>,
    errorMsg: string,
    throwMsg: string
  ): Promise<T> {
    try {
      await this.mongoDBService.connect();
      return await operation();
    } catch (error) {
      console.error(errorMsg, error);
      throw new DatabaseError(throwMsg);
    }
  }
}
