import { Language, Text, WordList } from "@/api/lib/domain";

const symbol = Symbol("Lemmatization");

export class Lemmatization {
  public static [symbol] = symbol;
  readonly _wordList: WordList;
  readonly _language: Language;
  readonly _source: Text;

  constructor(wordList: WordList, language: Language, source: Text) {
    this._wordList = wordList;
    this._language = language;
    this._source = source;
    this.validate();
  }
  private validate() {
    if (!this.isSameLanguage()) {
      throw new Error("Word list has different languages");
    }
  }
  private isSameLanguage() {
    return this._wordList._language.isSame(this._language);
  }
  toJSON() {
    return {
      wordList: this._wordList.toJSON(),
      language: this._language.toJSON(),
      source: this._source.toJSON(),
    };
  }
}
