const symbol = Symbol("Text");

export class Text {
  public static [symbol] = symbol;
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }

  validate() {
    if (this._value.length > 5000) {
      throw new Error("Text is too long");
    }
    if (this.isEmpty()) {
      throw new Error("Text is empty");
    }
  }

  get length() {
    return this._value.length;
  }

  isEmpty() {
    return this._value === "";
  }

  toJSON() {
    return this._value;
  }
}
