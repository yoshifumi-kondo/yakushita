import type { IWordUsageService } from "@/api/feature/wordUsage/service/IWordUsageService";
import {
  WordUsage,
  type UserId,
  type WordList,
  type WordUsageList,
} from "@/api/lib/domain";
import type { IWordUsageRepository } from "@/api/lib/repository/IWordUsageRepository";

export class WordUsageService implements IWordUsageService {
  constructor(readonly wordUsageRepository: IWordUsageRepository) {}
  async getByWordList(
    userId: UserId,
    wordList: WordList
  ): Promise<WordUsageList> {
    return await this.wordUsageRepository.getByWordList(userId, wordList);
  }
  async getTopUsedList(userId: UserId, limit: number): Promise<WordUsageList> {
    return await this.wordUsageRepository.getTopUsedList(userId, limit);
  }

  async createAll(wordUsageList: WordUsageList): Promise<void> {
    await this.wordUsageRepository.saveAll(wordUsageList);
  }
  async updateAll(wordUsageList: WordUsageList): Promise<void> {
    await this.wordUsageRepository.updateAll(wordUsageList);
  }
}
