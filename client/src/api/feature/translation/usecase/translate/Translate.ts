import {
  Original,
  Translation,
  TranslationConfig,
  UserId,
} from "@/api/lib/domain";
import { ITranslate } from "@/api/feature/translation/usecase/translate/ITranslate";
import { ITranslationService } from "@/api/feature/translation/service/ITranslationService";
import { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";

export class Translate implements ITranslate {
  private readonly lemmatizeService: ILemmatizationService;
  private readonly translationService: ITranslationService;

  constructor(
    lemmatizeService: ILemmatizationService,
    translationService: ITranslationService
  ) {
    this.lemmatizeService = lemmatizeService;
    this.translationService = translationService;
  }

  async execute(
    original: Original,
    config: TranslationConfig,
    userId: UserId
  ): Promise<Translation> {
    const translation = await this.translationService.translate(
      original,
      config
    );
    const lemmatize = await this.lemmatizeService.lemmatize(translation);
    await this.lemmatizeService.save(lemmatize, userId);
    return translation;
  }
}
