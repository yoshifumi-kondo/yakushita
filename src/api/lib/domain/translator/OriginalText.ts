const symbol = Symbol("OriginalText");

export class OriginalText {
  private _TEXT_MAX_LENGTH = 100;
  public static [symbol] = symbol;
  private _text: string;

  constructor(text: string) {
    this._text = text;
    this.validate();
  }
  private validate() {
    if (this._text.length > this._TEXT_MAX_LENGTH) {
      throw new Error(
        `Text should be less than ${this._TEXT_MAX_LENGTH} characters`
      );
    }
  }

  toJSON() {
    return this._text;
  }
}
