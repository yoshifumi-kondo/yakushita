import type {
  Original,
  TranslationConfig,
  UserId,
  TranslatedTranslation,
} from "@/api/lib/domain";

export interface ITranslate {
  execute(
    userId: UserId,
    original: Original,
    config: TranslationConfig
  ): Promise<TranslatedTranslation>;
}
