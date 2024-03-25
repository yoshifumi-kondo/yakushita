import { UserId } from "@/api/lib/domain";
import { lemmatizeService } from "@/api/feature/lemmatization/service";

export const GetTopWordsUsecase = async (userId: UserId) => {
  const wordList = await lemmatizeService.getTopWords(userId);
  return wordList;
};
