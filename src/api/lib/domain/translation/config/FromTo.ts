import { Language } from "@/api/lib/domain";

const symbol = Symbol("TranslationConfig");

export class FromTo {
  public static [symbol] = symbol;
  private _to: Language;
  private _from: Language;

  constructor(from: Language, to: Language) {
    this._from = from;
    this._to = to;
  }
  get to() {
    return this._to;
  }
  get from() {
    return this._from;
  }
  private validate() {
    if (this._from.isSameLanguage(this._to)) {
      throw new Error("From and to languages are the same");
    }
  }
  private isSameLanguage() {
    this._from.isSameLanguage(this._to);
  }

  toJSON() {
    return {
      to: this.to.toJSON(),
      from: this.from.toJSON(),
    };
  }
}
