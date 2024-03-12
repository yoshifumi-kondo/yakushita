import { FromTo, Original, Translated } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class TranslationConfig {
  public static [symbol] = symbol;
  private fromTo: FromTo;

  constructor(fromTo: FromTo) {
    this.fromTo = fromTo;
  }

  matchFromTo(Original: Original, Translated: Translated) {
    console.log(Original.language, this.fromTo.from);
    return (
      Original.language.isSameLanguage(this.fromTo.from) &&
      Translated.language.isSameLanguage(this.fromTo.to)
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
