import type { Language, Text } from "@/api/lib/domain";

const symbol = Symbol("Original");

export class Original {
  public static readonly TEXT_MAX_LENGTH = 100;
  public static [symbol] = symbol;
  constructor(readonly text: Text, readonly language: Language) {
    this.validate();
  }
  private validate() {
    if (this.overMaxTextLength()) {
      throw new Error("Original text is too long");
    }
  }
  private overMaxTextLength() {
    return this.text.length > Original.TEXT_MAX_LENGTH;
  }

  toJSON() {
    return {
      text: this.text.toJSON(),
      language: this.language.toJSON(),
    };
  }
}
