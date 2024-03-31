import type {
  TranslatedTranslation,
  DraftTranslation,
  Translation,
} from "@/api/lib/domain";

export abstract class ITranslationService {
  abstract translate(draft: DraftTranslation): Promise<TranslatedTranslation>;
  abstract save(translation: Translation): Promise<void>;
}
