import type { UserId, WordList } from "@/api/lib/domain";

export abstract class ICountByWordList {
  abstract execute(userId: UserId, wordList: WordList): Promise<void>;
}
