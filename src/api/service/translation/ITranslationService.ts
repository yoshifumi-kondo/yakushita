import {
  OriginalText,
  TranslationConfig,
  TranslationResult,
} from "@/api/lib/domain";

export abstract class ITranslationService {
  abstract translate(
    originalText: OriginalText,
    config: TranslationConfig
  ): Promise<TranslationResult>;
}
