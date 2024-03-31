import type { Lemmatization } from "@/api/lib/domain";
import {
  DraftLemmatization,
  LemmatizedLemmatization,
} from "@/api/lib/domain/lemmatization";

const symbol = Symbol("LemmatizationList");
export class LemmatizationList {
  public readonly [symbol]: typeof symbol = symbol;
  constructor(readonly list: Lemmatization[]) {}
  static createEmpty() {
    return new LemmatizationList([]);
  }
  get draft() {
    return new DraftLemmatizationList(this.list.filter(DraftLemmatization.is));
  }
  get lemmatized() {
    return new LemmatizedLemmatizationList(
      this.list.filter(LemmatizedLemmatization.is)
    );
  }
  toJSON() {
    return this.list.map((lemmatization) => lemmatization.toJSON());
  }
}

export class DraftLemmatizationList {
  constructor(readonly list: DraftLemmatization[]) {}
  toJSON() {
    return this.list.map((lemmatization) => lemmatization.toJSON());
  }
}
export class LemmatizedLemmatizationList {
  constructor(readonly list: LemmatizedLemmatization[]) {}
  toJSON() {
    return this.list.map((lemmatization) => lemmatization.toJSON());
  }
}
