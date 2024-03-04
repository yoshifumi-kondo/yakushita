const symbol = Symbol("OriginalText");

export class OriginalText {
  private static readonly _TEXT_MAX_LENGTH = 100;
  public static [symbol] = symbol;
  private _text: string;

  constructor(text: string) {
    this._text = text;
    this.validate();
  }
  private validate() {
    if (this.isEmpty()) {
      throw new Error("Original text is empty");
    }
    if (this.overMaxTextLength()) {
      throw new Error("Original text is too long");
    }
  }
  private overMaxTextLength() {
    return this._text.length > OriginalText._TEXT_MAX_LENGTH;
  }
  private isEmpty() {
    return !this._text || this._text.trim().length === 0;
  }
  toJSON() {
    return this._text;
  }
}
