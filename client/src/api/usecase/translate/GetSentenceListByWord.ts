import { UserId, Word } from "@/api/lib/domain";
import { lemmatizeService } from "@/api/service";

export const GetSentenceListByWord = async (word: Word, userId: UserId) => {
  const sentenceList = await lemmatizeService.getSentencesByWord(word, userId);
  return sentenceList;
};