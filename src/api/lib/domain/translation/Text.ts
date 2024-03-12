const symbol = Symbol("Text");

export class Text {
  public static MAX_LENGTH = 5000;
  public static [symbol] = symbol;
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    if (this._value.length > Text.MAX_LENGTH) {
      throw new Error("Text is too long");
    }
    if (this.isEmpty()) {
      throw new Error("Text is empty");
    }
  }

  get length() {
    return this._value.length;
  }

  private isEmpty() {
    return this._value.trim() === "";
  }

  toJSON() {
    return this._value;
  }
}
