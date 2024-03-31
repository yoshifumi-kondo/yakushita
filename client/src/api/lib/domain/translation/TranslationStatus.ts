const symbol = Symbol("TranslationStatus");

export enum TRANSLATION_TYPE {
  DRAFT = "DRAFT",
  TRANSLATED = "TRANSLATED",
}

export class TranslationStatus {
  public static [symbol] = symbol;

  constructor(readonly value: TRANSLATION_TYPE) {}
  public static createDraft() {
    return new TranslationStatus(TRANSLATION_TYPE.DRAFT);
  }
  public static createTranslated() {
    return new TranslationStatus(TRANSLATION_TYPE.TRANSLATED);
  }
  isDraft() {
    return this.value === TRANSLATION_TYPE.DRAFT;
  }
  isTranslated() {
    return this.value === TRANSLATION_TYPE.TRANSLATED;
  }
  toJSON() {
    return this.value;
  }
}
