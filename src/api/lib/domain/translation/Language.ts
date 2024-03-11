export enum LanguagesType {
  ENGLISH = "en",
  JAPANESE = "ja",
}

const symbol = Symbol("Language");

export class Language {
  public static [symbol] = symbol;
  private _language: LanguagesType;

  constructor(language: LanguagesType) {
    this._language = language;
  }

  isSameLanguage(language: Language) {
    return this._language === language._language;
  }

  toJSON() {
    return this._language;
  }
}
