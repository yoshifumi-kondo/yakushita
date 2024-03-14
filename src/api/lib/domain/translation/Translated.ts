import { Language, Text } from "@/api/lib/domain";

const symbol = Symbol("Translated");

export class Translated {
  public static [symbol] = symbol;
  private _text: Text;
  private _language: Language;
  get language() {
    return this._language;
  }
  get text() {
    return this._text;
  }

  constructor(text: Text, language: Language) {
    this._text = text;
    this._language = language;
  }

  toJSON() {
    return {
      text: this._text.toJSON(),
      language: this._language.toJSON(),
    };
  }
}
