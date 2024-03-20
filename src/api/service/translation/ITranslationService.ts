import type {
  Original,
  Translation,
  TranslationConfig,
  WordList,
} from "@/api/lib/domain";

export abstract class ITranslationService {
  abstract translate(
    originalText: Original,
    config: TranslationConfig,
  ): Promise<Translation>;
  abstract lemmatize(translation: Translation): Promise<WordList>;
}
