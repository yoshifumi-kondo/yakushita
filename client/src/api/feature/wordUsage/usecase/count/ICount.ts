import type { UserId, WordList } from "@/api/lib/domain";

export abstract class ICount {
  abstract execute(userId: UserId, wordList: WordList): Promise<void>;
}
