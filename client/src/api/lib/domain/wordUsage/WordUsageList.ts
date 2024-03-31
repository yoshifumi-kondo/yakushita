import type { Word } from "@/api/lib/domain";
import type { WordUsage } from "@/api/lib/domain/wordUsage/WordUsage";

const symbol = Symbol("WordWithCountList");
export class WordUsageList {
  public static [symbol]: typeof symbol = symbol;
  constructor(readonly list: WordUsage[]) {}
  hasWord(word: Word) {
    return this.list.some((wordWithCount) => wordWithCount.word.isSame(word));
  }
  readonly map = <T>(fn: (wordWithCount: WordUsage) => T) => {
    return this.list.map(fn);
  };
  readonly increaseAllCounts = () => {
    return new WordUsageList(
      this.list.map((wordWithCount) => wordWithCount.increaseCount())
    );
  };
  toJSON() {
    return this.list.map((word) => word.toJSON());
  }
}
