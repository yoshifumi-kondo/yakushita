const symbol = Symbol("TranslatedText");

export class TranslatedText {
  public static [symbol] = symbol;
  private _text: string;

  constructor(text: string) {
    this._text = text;
  }

  toJSON() {
    return this._text;
  }
}
