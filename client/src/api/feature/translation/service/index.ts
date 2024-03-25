import { TranslationService } from "@/api/feature/translation/service/TranslationService";
import { OpenAiAdapter } from "@/api/infrastructure/adapter/openai/OpenAiAdopter";
import { ENV_KEY, getEnvValue } from "@/utils/getEnv";

export const translationService = new TranslationService(
  new OpenAiAdapter(getEnvValue(ENV_KEY.OPENAI_API_KEY))
);
