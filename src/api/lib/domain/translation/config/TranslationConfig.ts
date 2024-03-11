import { FromTo, Original, Translated } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class TranslationConfig {
  public static [symbol] = symbol;
  private fromTo: FromTo;

  constructor(fromTo: FromTo) {
    this.fromTo = fromTo;
  }

  matchFromTo(Original: Original, Translated: Translated) {
    console.log(Original.getLanguage(), this.fromTo.getFrom());
    return (
      Original.getLanguage().isSameLanguage(this.fromTo.getFrom()) &&
      Translated.getLanguage().isSameLanguage(this.fromTo.getTo())
    );
  }

  getTo() {
    return this.fromTo.getTo();
  }

  toJSON() {
    return {
      fromTo: this.fromTo.toJSON(),
    };
  }
}
