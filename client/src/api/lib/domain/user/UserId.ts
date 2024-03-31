import { generateId } from "@/api/utils/generateUlid";

const symbol = Symbol("UserId");

export class UserId {
  public static [symbol] = symbol;
  constructor(readonly id: string) {}
  public static create() {
    return new UserId(generateId());
  }
  toJSON() {
    return this.id;
  }
}
