import {
  DraftTranslation,
  type Original,
  type TranslatedTranslation,
  type TranslationConfig,
  type UserId,
} from "@/api/lib/domain";
import type { ITranslate } from "@/api/feature/translation/usecase/translate/ITranslate";
import type { ITranslationService } from "@/api/feature/translation/service/ITranslationService";

export class Translate implements ITranslate {
  constructor(private readonly translationService: ITranslationService) {}
  async execute(
    userId: UserId,
    original: Original,
    config: TranslationConfig
  ): Promise<TranslatedTranslation> {
    const draft = DraftTranslation.create(userId, original, config);
    const translated = await this.translationService.translate(draft);
    await this.translationService.save(translated);
    return translated;
  }
}
