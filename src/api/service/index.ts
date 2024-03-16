import { UserRepository } from "@/api/lib/infrastructure/persistent/mongo/UserRepository";
import { UserService } from "@/api/service/user/UserService";
import { TranslationService } from "@/api/service/translation/TranslationService";
import { OpenAiService } from "@/api/lib/infrastructure/adapter/openai/OpenAiService";
import { ENV_KEY, getEnvValue } from "@/utils/geEnv";
import { LemmatizeService } from "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeService";

export const userService = new UserService(new UserRepository());
export const translationService = new TranslationService(
  new OpenAiService(getEnvValue(ENV_KEY.OPENAI_API_KEY)),
  new LemmatizeService()
);
