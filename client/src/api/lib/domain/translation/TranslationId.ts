import { generateId } from "@/api/utils/generateUlid";

const symbol = Symbol("TranslationId");

export class TranslationId {
  public static [symbol] = symbol;
  constructor(readonly id: string) {}
  public static create() {
    return new TranslationId(generateId());
  }
  toJSON() {
    return this.id;
  }
}
