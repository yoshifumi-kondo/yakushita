const symbol = Symbol("Text");

export class Text {
  public static MAX_LENGTH = 500;
  public static [symbol] = symbol;

  constructor(readonly value: string) {
    this.validate();
  }

  private validate() {
    if (this.value.length > Text.MAX_LENGTH) {
      throw new Error("Text is too long");
    }
    if (this.isEmpty()) {
      throw new Error("Text is empty");
    }
  }

  get length() {
    return this.value.length;
  }

  private isEmpty() {
    return this.value.trim() === "";
  }
  isSame(text: Text) {
    return this.value === text.value;
  }

  toJSON() {
    return this.value;
  }
}
