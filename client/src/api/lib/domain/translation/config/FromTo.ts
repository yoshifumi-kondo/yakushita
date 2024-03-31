import type { Language } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class FromTo {
  public static [symbol] = symbol;

  constructor(readonly from: Language, readonly to: Language) {
    this.validate();
  }
  private validate() {
    if (this.isSameLanguage()) {
      throw new Error("From and to languages are the same");
    }
  }
  private isSameLanguage() {
    return this.from.isSame(this.to);
  }

  toJSON() {
    return {
      to: this.to.toJSON(),
      from: this.from.toJSON(),
    };
  }
}
