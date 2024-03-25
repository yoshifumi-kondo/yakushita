import { lemmatizationService } from "@/api/feature/lemmatization/service";
import { GetSentenceListByWord } from "@/api/feature/lemmatization/usecase/getSentenceListByWord/GetSentenceListByWord";
import { GetTopWordList } from "@/api/feature/lemmatization/usecase/getTopWordList/GetTopWordList";

export const getSentenceListByWord = new GetSentenceListByWord(
  lemmatizationService
);

export const getTopWordList = new GetTopWordList(lemmatizationService);
