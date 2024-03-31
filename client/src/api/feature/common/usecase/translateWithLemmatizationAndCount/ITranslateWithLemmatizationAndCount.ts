import type {
  Language,
  Original,
  TranslatedTranslation,
  TranslationConfig,
  UserId,
} from "@/api/lib/domain";

export abstract class ITranslateWithLemmatizationAndCount {
  abstract execute(
    userId: UserId,
    translationConfig: TranslationConfig,
    original: Original,
    target: Language
  ): Promise<TranslatedTranslation>;
}
