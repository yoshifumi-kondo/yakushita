import { LemmatizeAdopter } from "@/api/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import { LemmatizationService } from "@/api/feature/lemmatization/service/LemmatizationService";
import { LemmatizationRepository } from "@/api/infrastructure/persistent/mongo/LemmatizationRepository";
import { LemmatizationModel } from "@/api/infrastructure/persistent/mongo/Schema";

export const lemmatizationService = new LemmatizationService(
  new LemmatizeAdopter(),
  new LemmatizationRepository(LemmatizationModel)
);
