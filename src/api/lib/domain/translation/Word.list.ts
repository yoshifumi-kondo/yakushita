import { Word } from "@/api/lib/domain/translation/Word";

export const symbol = Symbol("WordList");
export class WordList {
  public static [symbol]: typeof symbol = symbol;
  private _list: Word[];
  constructor(list: Word[]) {
    this._list = list;
  }
  toJSON() {
    return this._list.map((word) => word.toJSON());
  }
}
