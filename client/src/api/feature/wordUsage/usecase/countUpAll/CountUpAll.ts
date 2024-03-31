import type { IWordUsageService } from "@/api/feature/wordUsage/service/IWordUsageService";
import type { ICountUpAll } from "@/api/feature/wordUsage/usecase/countUpAll/ICountUpAll";
import type { WordUsageList } from "@/api/lib/domain";

export class CountUpAll implements ICountUpAll {
  constructor(readonly wordUsageService: IWordUsageService) {}
  async execute(wordUsageList: WordUsageList) {
    const updatedWordUsageList = wordUsageList.increaseAllCounts();
    await this.wordUsageService.updateAll(updatedWordUsageList);
  }
}
