import type { IWordUsageService } from "@/api/feature/wordUsage/service/IWordUsageService";
import type { IGetTopUsedList } from "@/api/feature/wordUsage/usecase/getTopUsedList/IGetTopUsedList";
import type { UserId, WordUsageList } from "@/api/lib/domain";

export class GetTopUsedList implements IGetTopUsedList {
  constructor(readonly wordUsageService: IWordUsageService) {}

  async execute(userId: UserId): Promise<WordUsageList> {
    return this.wordUsageService.getTopUsedList(userId, 20);
  }
}
