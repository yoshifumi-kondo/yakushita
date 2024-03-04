import { OriginalText } from "@/api/lib/domain/translator/OriginalText";
import { TranslationConfig } from "@/api/lib/domain/translator/TranslationConfig";
import { TranslationResult } from "@/api/lib/domain/translator/TranslationResult";

export abstract class ITranslationService {
  abstract translate(
    originalText: OriginalText,
    config: TranslationConfig
  ): Promise<TranslationResult>;
}
