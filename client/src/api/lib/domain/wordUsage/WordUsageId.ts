import { generateId } from "@/api/utils/generateUlid";

const symbol = Symbol("WordUsageId");

export class WordUsageId {
  public static [symbol] = symbol;
  constructor(readonly id: string) {}
  public static create() {
    return new WordUsageId(generateId());
  }
  toJSON() {
    return this.id;
  }
}
