export enum LanguagesType {
  ENGLISH = "en",
  JAPANESE = "ja",
}

const symbol = Symbol("Language");

export class Language {
  public static [symbol] = symbol;

  constructor(readonly language: LanguagesType) {}
  isEnglish() {
    return this.language === LanguagesType.ENGLISH;
  }

  isSame(language: Language) {
    return this.language === language.language;
  }

  toJSON() {
    return this.language;
  }
}
