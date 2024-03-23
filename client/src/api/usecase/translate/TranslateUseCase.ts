import { Original, TranslationConfig, UserId } from "@/api/lib/domain";
import { lemmatizeService, translationService } from "@/api/service";

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
