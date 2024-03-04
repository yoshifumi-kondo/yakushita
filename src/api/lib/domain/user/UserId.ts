import { generateId } from "@/api/utils/generateUlid";

const symbol = Symbol("UserId");

export class UserId {
  public static [symbol] = symbol;
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  create() {
    new UserId(generateId());
  }

  toJSON() {
    return this._id;
  }
}
