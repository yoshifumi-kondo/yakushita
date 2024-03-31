import { generateId } from "@/api/utils/generateUlid";
const symbol = Symbol("LemmatizationId");
export class LemmatizationId {
  public static [symbol] = symbol;
  constructor(readonly id: string) {}
  public static create() {
    return new LemmatizationId(generateId());
  }
  toJSON() {
    return this.id;
  }
}
