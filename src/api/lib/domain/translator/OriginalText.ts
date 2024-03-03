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
    if (this._text.length > OriginalText._TEXT_MAX_LENGTH) {
      throw new Error(
        `Text should be less than ${OriginalText._TEXT_MAX_LENGTH} characters`
      );
    }
  }

  toJSON() {
    return this._text;
  }
}
