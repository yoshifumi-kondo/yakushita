import { UserRepository } from "@/api/lib/infrastructure/persistent/mongo/UserRepository";
import { UserService } from "@/api/service/user/UserService";
import { TranslationService } from "@/api/service/translation/TranslationService";
import { OpenAiAdapter } from "@/api/lib/infrastructure/adapter/openai/OpenAiAdopter";
import { ENV_KEY, getEnvValue } from "@/utils/getEnv";
import { LemmatizeAdopter } from "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import { LemmatizationService } from "@/api/service/lemmatization/LemmatizationService";
import { LemmatizationRepository } from "@/api/lib/infrastructure/persistent/mongo/LemmatizeRepository";

export const userService = new UserService(new UserRepository());
export const translationService = new TranslationService(
  new OpenAiAdapter(getEnvValue(ENV_KEY.OPENAI_API_KEY))
);
export const lemmatizeService = new LemmatizationService(
  new LemmatizeAdopter(),
  new LemmatizationRepository()
);
