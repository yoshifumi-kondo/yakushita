const symbol = Symbol("Exclusion");
export class Exclusion {
  public static [symbol] = symbol;
  constructor(readonly value: boolean) {}
  public static createTrue() {
    return new Exclusion(true);
  }
  public static createFalse() {
    return new Exclusion(false);
  }
  toJSON() {
    return this.value;
  }
}
