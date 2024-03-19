import { WordWithCount } from "@/api/lib/domain/lemmatization/WordWithCount";

const symbol = Symbol("WordWithCountList");
export class WordWithCountList {
  public static [symbol]: typeof symbol = symbol;
  readonly _list: WordWithCount[];
  constructor(wordList: WordWithCount[]) {
    this._list = wordList;
  }
  toJSON() {
    return this._list.map((word) => word.toJSON());
  }
}
