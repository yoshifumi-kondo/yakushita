import { Language } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class FromTo {
  public static [symbol] = symbol;
  private to: Language;
  private from: Language;

  constructor(from: Language, to: Language) {
    this.from = from;
    this.to = to;
  }
  getTo() {
    return this.to;
  }
  getFrom() {
    return this.from;
  }
  toJSON() {
    return {
      to: this.to.toJSON(),
      from: this.from.toJSON(),
    };
  }
}
