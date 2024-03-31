import type {
  UserId,
  WordList,
  WordUsage,
  WordUsageList,
} from "@/api/lib/domain";

export abstract class IWordUsageRepository {
  abstract save(wordUsage: WordUsage): Promise<void>;
  abstract saveAll(list: WordUsageList): Promise<void>;
  abstract getByWordList(
    userId: UserId,
    wordList: WordList
  ): Promise<WordUsageList>;
  abstract getTopUsedList(
    userId: UserId,
    limit: number
  ): Promise<WordUsageList>;
  abstract updateAll(wordUsageList: WordUsageList): Promise<void>;
}
