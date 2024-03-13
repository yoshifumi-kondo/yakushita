import { FromTo, Original, Translated } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class TranslationConfig {
  public static [symbol] = symbol;
  private fromTo: FromTo;

  constructor(fromTo: FromTo) {
    this.fromTo = fromTo;
  }

  matchFromTo(original: Original, translated: Translated) {
    return (
      original.language.isSameLanguage(this.fromTo.from) &&
      translated.language.isSameLanguage(this.fromTo.to)
    );
  }

  get to() {
    return this.fromTo.to;
  }

  toJSON() {
    return {
      fromTo: this.fromTo.toJSON(),
    };
  }
}
