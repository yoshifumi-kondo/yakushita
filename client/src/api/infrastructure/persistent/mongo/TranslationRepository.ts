import type { TranslationModel } from "@/api/infrastructure/persistent/mongo/Schema";
import { BaseRepository } from "@/api/infrastructure/persistent/mongo/BaseRepository";
import type { ITranslationRepository } from "@/api/lib/repository/ITranslationRepository";
import {
  FromTo,
  Language,
  Original,
  Text,
  Translated,
  TranslatedTranslation,
  TranslationConfig,
  UserId,
  type Translation,
  DraftTranslation,
} from "@/api/lib/domain";
import { TranslationId } from "@/api/lib/domain/translation/TranslationId";
import { TranslationStatus } from "@/api/lib/domain/translation/TranslationStatus";

export class TranslationRepository
  extends BaseRepository
  implements ITranslationRepository
{
  constructor(private readonly model: typeof TranslationModel) {
    super();
  }

  async save(translation: Translation): Promise<void> {
    return await this.performDbOperation(
      async () => {
        const json = translation.toJSON();
        await this.model.create(json);
      },
      "Error saving translation",
      "Error saving translation"
    );
  }

  async getTranslationById(
    translationId: TranslationId
  ): Promise<Translation | null> {
    const translation = await this.model.findById(translationId.toJSON());

    if (!translation) {
      return null;
    }

    const {
      original,
      translated,
      config: {
        fromTo: { from, to },
      },
    } = translation;
    const id = new TranslationId(translation.id);
    const userId = new UserId(translation.userId);
    const originalText = new Original(
      new Text(original.text),
      new Language(original.language)
    );
    const config = new TranslationConfig(
      new FromTo(new Language(from), new Language(to))
    );
    const status = new TranslationStatus(translation.status);

    if (status.isDraft()) {
      return new DraftTranslation(id, status, userId, originalText, config);
    }
    if (status.isTranslated() && translated) {
      return new TranslatedTranslation(
        id,
        status,
        userId,
        originalText,
        config,
        new Translated(
          new Text(translated.text),
          new Language(translated.language)
        )
      );
    }
    throw new Error("Invalid translation status");
  }
}
