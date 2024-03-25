import { Original, TranslationConfig, UserId } from "@/api/lib/domain";
import { lemmatizeService } from "@/api/feature/lemmatization/service";
import { translationService } from "@/api/feature/translation/service";

export const TransLateUseCase = async (
  original: Original,
  config: TranslationConfig,
  userId: UserId
) => {
  const translation = await translationService.translate(original, config);
  const lemmatize = await lemmatizeService.lemmatize(translation);
  await lemmatizeService.save(lemmatize, userId);
  return translation;
};
