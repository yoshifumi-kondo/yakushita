import type { Translation } from "@/api/lib/domain";
import type { TranslationId } from "@/api/lib/domain/translation/TranslationId";

export abstract class ITranslationRepository {
  abstract save(translation: Translation): Promise<void>;
  abstract getTranslationById(
    translationId: TranslationId
  ): Promise<Translation | null>;
}
