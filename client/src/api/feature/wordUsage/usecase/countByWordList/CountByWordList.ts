import type { IWordUsageService } from "@/api/feature/wordUsage/service/IWordUsageService";
import type { ICountUpAll } from "@/api/feature/wordUsage/usecase/countUpAll/ICountUpAll";
import type { ICreateAll } from "@/api/feature/wordUsage/usecase/createAll/ICreateAll";
import type { ICountByWordList } from "@/api/feature/wordUsage/usecase/countByWordList/ICountByWordList";
import {
  WordUsageList,
  type UserId,
  type WordList,
  WordUsage,
} from "@/api/lib/domain";

export class CountByWordList implements ICountByWordList {
  constructor(
    readonly wordUsageService: IWordUsageService,
    readonly createAll: ICreateAll,
    readonly countUpAll: ICountUpAll
  ) {}

  async execute(userId: UserId, wordList: WordList): Promise<void> {
    const existingWordUsageList = await this.wordUsageService.getByWordList(
      userId,
      wordList
    );
    const newWordList = wordList.filter(
      (word) => !existingWordUsageList.hasWord(word)
    );
    const newWordUsageList = new WordUsageList(
      newWordList.map((word) => WordUsage.create(word, userId))
    );
    await this.createAll.execute(newWordUsageList);
    await this.countUpAll.execute(existingWordUsageList);
  }
}
