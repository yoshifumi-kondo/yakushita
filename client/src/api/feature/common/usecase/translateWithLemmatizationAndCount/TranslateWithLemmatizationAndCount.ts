import type { ILemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/ILemmatizeAndCount";
import type { ITranslateWithLemmatizationAndCount } from "@/api/feature/common/usecase/translateWithLemmatizationAndCount/ITranslateWithLemmatizationAndCount";
import type { ITranslate } from "@/api/feature/translation/usecase/translate/ITranslate";
import {
  LanguagesType,
  Language,
  type Original,
  type TranslatedTranslation,
  type TranslationConfig,
  type UserId,
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
    original: Original
  ): Promise<TranslatedTranslation> {
    const translatedTranslation = await this.translate.execute(
      userId,
      original,
      translationConfig
    );
    // NOTE: This is a temporary solution to get the target language
    // it should depend on the user's preferences
    const targetLanguage = new Language(LanguagesType.ENGLISH);
    const pickedSentence =
      translatedTranslation.getTextByLanguage(targetLanguage);
    await this.lemmatizeAndCount.execute(userId, pickedSentence);
    return translatedTranslation;
  }
}
