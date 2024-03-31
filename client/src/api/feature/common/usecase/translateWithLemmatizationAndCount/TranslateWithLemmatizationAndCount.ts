import type { ILemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/ILemmatizeAndCount";
import type { ITranslateWithLemmatizationAndCount } from "@/api/feature/common/usecase/translateWithLemmatizationAndCount/ITranslateWithLemmatizationAndCount";
import type { ITranslate } from "@/api/feature/translation/usecase/translate/ITranslate";
import type {
  Language,
  Original,
  TranslatedTranslation,
  TranslationConfig,
  UserId,
} from "@/api/lib/domain";

export class TranslateWithLemmatizationAndCount
  implements ITranslateWithLemmatizationAndCount
{
  constructor(
    private readonly translate: ITranslate,
    private readonly lemmatizeAndCount: ILemmatizeAndCount
  ) {}
  async execute(
    userId: UserId,
    translationConfig: TranslationConfig,
    original: Original,
    target: Language
  ): Promise<TranslatedTranslation> {
    const translatedTranslation = await this.translate.execute(
      userId,
      original,
      translationConfig
    );
    await this.lemmatizeAndCount.execute(
      userId,
      target,
      translatedTranslation.translated.text
    );
    return translatedTranslation;
  }
}
