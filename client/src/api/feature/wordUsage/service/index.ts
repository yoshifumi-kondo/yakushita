import { WordUsageService } from "@/api/feature/wordUsage/service/WordUsageService";
import { WordUsageModel } from "@/api/infrastructure/persistent/mongo/Schema";
import { WordUsageRepository } from "@/api/infrastructure/persistent/mongo/WordUsageRepository";

export const wordUsageService = new WordUsageService(
  new WordUsageRepository(WordUsageModel)
);
