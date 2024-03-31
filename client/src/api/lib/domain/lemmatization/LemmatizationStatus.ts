const symbol = Symbol("TranslationStatus");

export enum LEMMATIZATION_TYPE {
  DRAFT = "DRAFT",
  LEMMATIZED = "LEMMATIZED",
}

export class LemmatizationStatus {
  public static [symbol] = symbol;

  constructor(readonly value: LEMMATIZATION_TYPE) {}
  public static createDraft() {
    return new LemmatizationStatus(LEMMATIZATION_TYPE.DRAFT);
  }
  public static createLemmatized() {
    return new LemmatizationStatus(LEMMATIZATION_TYPE.LEMMATIZED);
  }
  isDraft() {
    return this.value === LEMMATIZATION_TYPE.DRAFT;
  }
  isLemmatized() {
    return this.value === LEMMATIZATION_TYPE.LEMMATIZED;
  }
  toJSON() {
    return this.value;
  }
}
