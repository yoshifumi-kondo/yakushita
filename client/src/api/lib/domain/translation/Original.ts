import type { Language, Text } from "@/api/lib/domain";

const symbol = Symbol("Original");

export class Original {
  public static readonly _TEXT_MAX_LENGTH = 100;
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
    this.validate();
  }
  private validate() {
    if (this.overMaxTextLength()) {
      throw new Error("Original text is too long");
    }
  }
  private overMaxTextLength() {
    return this._text.length > Original._TEXT_MAX_LENGTH;
  }

  toJSON() {
    return {
      text: this._text.toJSON(),
      language: this._language.toJSON(),
    };
  }
}
