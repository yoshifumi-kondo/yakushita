import { Language, Text } from "@/api/lib/domain";

const symbol = Symbol("Translated");

export class Translated {
  public static [symbol] = symbol;
  private _text: Text;
  private _language: Language;

  constructor(text: Text, language: Language) {
    this._text = text;
    this._language = language;
  }

  getLanguage() {
    return this._language;
  }

  toJSON() {
    return {
      text: this._text.toJSON(),
      language: this._language.toJSON(),
    };
  }
}
