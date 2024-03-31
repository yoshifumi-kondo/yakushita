import type {
  Language,
  Original,
  Sentence,
  Text,
  Translated,
  TranslationConfig,
  UserId,
} from "@/api/lib/domain";
import { TranslationId } from "@/api/lib/domain/translation/TranslationId";
import { TranslationStatus } from "@/api/lib/domain/translation/TranslationStatus";

export type Translation = DraftTranslation | TranslatedTranslation;

abstract class Base {
  constructor(
    readonly id: TranslationId,
    readonly status: TranslationStatus,
    readonly userId: UserId,
    readonly original: Original,
    readonly config: TranslationConfig
  ) {}

  abstract validate(): void;

  toJSON() {
    return {
      id: this.id.toJSON(),
      status: this.status.toJSON(),
      userId: this.userId.toJSON(),
      original: this.original.toJSON(),
      config: this.config.toJSON(),
    };
  }
}

export class DraftTranslation extends Base {
  constructor(
    id: TranslationId,
    status: TranslationStatus,
    userId: UserId,
    original: Original,
    config: TranslationConfig
  ) {
    super(id, status, userId, original, config);
    this.validate;
  }

  static create(userId: UserId, original: Original, config: TranslationConfig) {
    return new DraftTranslation(
      TranslationId.create(),
      TranslationStatus.createDraft(),
      userId,
      original,
      config
    );
  }
  static is(translation: Translation): translation is DraftTranslation {
    return translation.status.isDraft();
  }

  validate() {
    if (!this.config.fromTo.from.isSame(this.original.sentence.language)) {
      throw new Error("Translation config does not match original");
    }
    if (!DraftTranslation.is(this)) {
      throw new Error("Status does not match");
    }
  }
}

export class TranslatedTranslation extends Base {
  constructor(
    id: TranslationId,
    status: TranslationStatus,
    userId: UserId,
    original: Original,
    config: TranslationConfig,
    readonly translated: Translated
  ) {
    super(id, status, userId, original, config);
    this.validate;
  }

  static create(draft: DraftTranslation, translated: Translated) {
    return new TranslatedTranslation(
      draft.id,
      TranslationStatus.createTranslated(),
      draft.userId,
      draft.original,
      draft.config,
      translated
    );
  }
  static is(translation: Translation): translation is TranslatedTranslation {
    return translation.status.isTranslated();
  }

  validate() {
    if (!this.config.matchFromTo(this.original, this.translated)) {
      throw new Error(
        "Translation config does not match original and translated"
      );
    }
    if (!TranslatedTranslation.is(this)) {
      throw new Error("Status does not match");
    }
  }

  getTextByLanguage(language: Language): Sentence {
    if (this.original.sentence.language.isSame(language)) {
      return this.original.sentence;
    }
    if (this.translated.sentence.language.isSame(language)) {
      return this.translated.sentence;
    }
    throw new Error(`Language ${language.toJSON()} not found in translation`);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      translated: this.translated.toJSON(),
    };
  }
}
