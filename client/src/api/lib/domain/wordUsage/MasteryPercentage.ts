const symbol = Symbol("MasteryPercentage");

export class MasteryPercentage {
  public static [symbol] = symbol;

  constructor(readonly value: number) {
    this.validate();
  }

  private validate() {
    if (this.value < 0 || this.value > 1) {
      throw new Error("MasteryPercentage value must be between 0 and 1");
    }
  }
  public static createZero() {
    return new MasteryPercentage(0);
  }

  toJSON() {
    return this.value;
  }

  toPercentage() {
    return Math.round(this.value * 100);
  }
}
