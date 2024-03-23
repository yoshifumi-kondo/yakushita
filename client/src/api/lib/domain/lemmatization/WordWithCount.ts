import { Word, WordCount } from "@/api/lib/domain";

const symbol = Symbol("WordWithCount");

export class WordWithCount {
  public static [symbol]: typeof symbol = symbol;
  readonly _word: Word;
  readonly _count: WordCount;
  constructor(word: Word, count: WordCount) {
    this._word = word;
    this._count = count;
  }
  toJSON() {
    return {
      word: this._word.toJSON(),
      count: this._count.toJSON(),
    };
  }
}
