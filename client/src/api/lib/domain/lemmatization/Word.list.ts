import { Language } from "@/api/lib/domain";
import { Word } from "@/api/lib/domain/lemmatization/Word";

export const symbol = Symbol("WordList");
export class WordList {
  public static [symbol]: typeof symbol = symbol;
  readonly _list: Word[];
  readonly _language: Language;
  constructor(list: Word[], language: Language) {
    this._list = list;
    this._language = language;
    this.validate();
  }
  private validate() {
    if (this.isEmpty()) {
      throw new Error("Word list is empty");
    }
    if (!this.isLanguageSame()) {
      throw new Error("Word list has different languages");
    }
  }
  private isEmpty() {
    return this._list.length === 0;
  }
  private isLanguageSame() {
    return this._list.every((word) => this._language.isSame(word._language));
  }
  toJSON() {
    return {
      list: this._list.map((word) => word.toJSON()),
      language: this._language.toJSON(),
    };
  }
}
