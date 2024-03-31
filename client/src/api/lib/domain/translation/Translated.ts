import type { Sentence } from "@/api/lib/domain";

const symbol = Symbol("Translated");

export class Translated {
  public static [symbol] = symbol;
  constructor(readonly sentence: Sentence) {}
  toJSON() {
    return {
      sentence: this.sentence.toJSON(),
    };
  }
}
