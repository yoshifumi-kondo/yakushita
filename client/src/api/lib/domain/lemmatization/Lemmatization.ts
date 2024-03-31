import type { Language, Sentence, UserId, WordList } from "@/api/lib/domain";
import { LemmatizationId } from "@/api/lib/domain/lemmatization/LemmatizationId";
import { LemmatizationStatus } from "@/api/lib/domain/lemmatization/LemmatizationStatus";

export type Lemmatization = DraftLemmatization | LemmatizedLemmatization;

abstract class Base {
  constructor(
    readonly id: LemmatizationId,
    readonly status: LemmatizationStatus,
    readonly userId: UserId,
    readonly language: Language,
    readonly source: Sentence
  ) {}

  abstract validate(): void;

  toJSON() {
    return {
      id: this.id.toJSON(),
      status: this.status.toJSON(),
      userId: this.userId.toJSON(),
      language: this.language.toJSON(),
      source: this.source.toJSON(),
    };
  }
}

export class DraftLemmatization extends Base {
  constructor(
    readonly id: LemmatizationId,
    readonly status: LemmatizationStatus,
    readonly userId: UserId,
    readonly language: Language,
    readonly source: Sentence
  ) {
    super(id, status, userId, language, source);
    this.validate;
  }

  static create(userId: UserId, language: Language, source: Sentence) {
    return new DraftLemmatization(
      LemmatizationId.create(),
      LemmatizationStatus.createDraft(),
      userId,
      language,
      source
    );
  }
  static is(lemmatization: Lemmatization): lemmatization is DraftLemmatization {
    return lemmatization.status.isDraft();
  }

  validate() {
    if (!DraftLemmatization.is(this)) {
      throw new Error("Status does not match");
    }
  }
}

export class LemmatizedLemmatization extends Base {
  constructor(
    readonly id: LemmatizationId,
    readonly status: LemmatizationStatus,
    readonly userId: UserId,
    readonly language: Language,
    readonly source: Sentence,
    readonly wordList: WordList
  ) {
    super(id, status, userId, language, source);
    this.validate;
  }

  static create(draft: DraftLemmatization, wordList: WordList) {
    return new LemmatizedLemmatization(
      draft.id,
      LemmatizationStatus.createLemmatized(),
      draft.userId,
      draft.language,
      draft.source,
      wordList
    );
  }

  validate() {
    if (!this.isSameLanguage()) {
      throw new Error("Word list has different languages");
    }
    if (!LemmatizedLemmatization.is(this)) {
      throw new Error("Status does not match");
    }
  }

  static is(
    lemmatization: Lemmatization
  ): lemmatization is LemmatizedLemmatization {
    return lemmatization.status.isLemmatized();
  }

  private isSameLanguage() {
    return this.wordList.language.isSame(this.language);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      wordList: this.wordList.toJSON(),
    };
  }
}
