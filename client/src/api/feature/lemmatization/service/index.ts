import { LemmatizeAdopter } from "@/api/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import { LemmatizationService } from "@/api/feature/lemmatization/service/LemmatizationService";
import { LemmatizationRepository } from "@/api/infrastructure/persistent/mongo/LemmatizeRepository";

export const lemmatizeService = new LemmatizationService(
  new LemmatizeAdopter(),
  new LemmatizationRepository()
);
