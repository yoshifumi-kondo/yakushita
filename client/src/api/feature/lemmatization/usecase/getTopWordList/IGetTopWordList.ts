import { UserId, WordWithCountList } from "@/api/lib/domain";

export interface IGetTopWordList {
  execute(userId: UserId): Promise<WordWithCountList>;
}
