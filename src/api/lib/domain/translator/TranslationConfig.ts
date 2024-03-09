import { Language } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class TranslationConfig {
  public static [symbol] = symbol;
  private to: Language;
  private from: Language;

  constructor(to: Language, from: Language) {
    this.to = to;
    this.from = from;
  }

  toJSON() {
    return {
      to: this.to.toJSON(),
      from: this.from.toJSON(),
    };
  }
}
