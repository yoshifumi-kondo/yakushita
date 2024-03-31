import type { UserId, WordList, WordUsageList } from "@/api/lib/domain";

export abstract class IWordUsageService {
  abstract getTopUsedList(
    userId: UserId,
    limit: number
  ): Promise<WordUsageList>;
  abstract getByWordList(
    userId: UserId,
    wordList: WordList
  ): Promise<WordUsageList>;
  abstract createAll(wordUsageList: WordUsageList): Promise<void>;
  abstract updateAll(wordUsageList: WordUsageList): Promise<void>;
}
