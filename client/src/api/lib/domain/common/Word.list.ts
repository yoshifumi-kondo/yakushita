import type { Language } from "@/api/lib/domain";
import type { Word } from "@/api/lib/domain/common/Word";

export const symbol = Symbol("WordList");
export class WordList {
  public static [symbol]: typeof symbol = symbol;
  constructor(readonly list: Word[]) {
    this.validate();
  }
  private validate() {
    if (!this.isSameAllLanguages()) {
      throw new Error("Word list has different languages");
    }
  }
  public static createEmpty() {
    return new WordList([]);
  }

  private isSameAllLanguages() {
    return this.list.every((word) =>
      word.language.isSame(this.list[0].language)
    );
  }
  get language(): Language {
    return this.list[0].language;
  }
  map<T>(fn: (word: Word) => T) {
    return this.list.map(fn);
  }
  filter(fn: (word: Word) => boolean) {
    return this.list.filter(fn);
  }
  toJSON() {
    return this.map((word) => word.toJSON());
  }
}
