const symbol = Symbol("Count");

export class Count {
  public static [symbol]: typeof symbol = symbol;
  constructor(readonly value: number) {
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
  public static createOne() {
    return new Count(1);
  }
  readonly increase = () => {
    return new Count(this.value + 1);
  };
  toJSON() {
    return this.value;
  }
}
