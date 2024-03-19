import { Original, TranslationConfig, Translation } from "@/api/lib/domain";

export abstract class ITranslationService {
  abstract translate(
    originalText: Original,
    config: TranslationConfig
  ): Promise<Translation>;
}
