import { SentenceList, UserId, Word } from "@/api/lib/domain";

export interface IGetSentenceListByWord {
  execute(word: Word, userId: UserId): Promise<SentenceList>;
}
