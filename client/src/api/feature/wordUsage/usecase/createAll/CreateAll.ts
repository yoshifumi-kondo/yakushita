import type { IWordUsageService } from "@/api/feature/wordUsage/service/IWordUsageService";
import type { ICreateAll } from "@/api/feature/wordUsage/usecase/createAll/ICreateAll";
import type { WordUsageList } from "@/api/lib/domain";
export class CreateAll implements ICreateAll {
  constructor(readonly wordUsageService: IWordUsageService) {}

  execute(wordUsageList: WordUsageList): Promise<void> {
    return this.wordUsageService.createAll(wordUsageList);
  }
}
