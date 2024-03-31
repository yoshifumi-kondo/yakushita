import type { Sentence } from "@/api/lib/domain";

const symbol = Symbol("Original");

export class Original {
  public static readonly TEXT_MAX_LENGTH = 500;
  public static [symbol] = symbol;
  constructor(readonly sentence: Sentence) {
    this.validate();
  }
  private validate() {
    if (this.overMaxTextLength()) {
      throw new Error("Original text is too long");
    }
  }
  private overMaxTextLength() {
    return this.sentence.text.length > Original.TEXT_MAX_LENGTH;
  }

  toJSON() {
    return {
      sentence: this.sentence.toJSON(),
    };
  }
}
