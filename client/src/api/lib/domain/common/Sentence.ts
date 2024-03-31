import type { Language, Text } from "@/api/lib/domain";

const symbol = Symbol("Sentence");
export class Sentence {
  public static [symbol] = symbol;
  constructor(readonly text: Text, readonly language: Language) {}
  toJSON() {
    return {
      text: this.text.toJSON(),
      language: this.language.toJSON(),
    };
  }
}
