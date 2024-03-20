import { Text, WordList } from "@/api/lib/domain";

const symbol = Symbol("Sentence");
export class Sentence {
  public readonly [symbol]: typeof symbol = symbol;
  readonly text: Text;
  constructor(text: Text) {
    this.text = text;
  }
  toJSON() {
    return {
      text: this.text.toJSON(),
    };
  }
}
