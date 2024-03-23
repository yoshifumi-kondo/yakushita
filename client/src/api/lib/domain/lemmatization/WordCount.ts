const symbol = Symbol("WordCount");

export class WordCount {
  public static [symbol]: typeof symbol = symbol;
  readonly value: number;
  constructor(count: number) {
    this.value = count;
    this.validate();
  }
  private validate() {
    if (!this.isPositive()) {
      throw new Error("Word count is not positive");
    }
  }
  private isPositive() {
    return this.value > 0;
  }
  toJSON() {
    return this.value;
  }
}
