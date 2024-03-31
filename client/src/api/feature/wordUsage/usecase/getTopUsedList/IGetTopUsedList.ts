import type { UserId, WordUsageList } from "@/api/lib/domain";

export interface IGetTopUsedList {
  execute(userId: UserId): Promise<WordUsageList>;
}
