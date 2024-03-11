import { Language, Text } from "@/api/lib/domain";

const symbol = Symbol("Original");

export class Original {
  public static readonly _TEXT_MAX_LENGTH = 100;
  public static [symbol] = symbol;
  private _text: Text;
  private _language: Language;

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
    return this._text.getLength() > Original._TEXT_MAX_LENGTH;
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
