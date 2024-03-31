import type { FromTo, Original, Translated } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class TranslationConfig {
  public static [symbol] = symbol;

  constructor(readonly fromTo: FromTo) {}

  matchFromTo(original: Original, translated: Translated) {
    return (
      original.sentence.language.isSame(this.fromTo.from) &&
      translated.sentence.language.isSame(this.fromTo.to)
    );
  }

  toJSON() {
    return {
      fromTo: this.fromTo.toJSON(),
    };
  }
}
