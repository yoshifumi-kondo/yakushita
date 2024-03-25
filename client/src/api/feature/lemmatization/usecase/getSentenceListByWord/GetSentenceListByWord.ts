import { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";
import { IGetSentenceListByWord } from "@/api/feature/lemmatization/usecase/getSentenceListByWord/IGetSentenceListByWord";
import { UserId, Word, SentenceList } from "@/api/lib/domain";

export class GetSentenceListByWord implements IGetSentenceListByWord {
  private readonly lemmatizeService: ILemmatizationService;

  constructor(lemmatizeService: ILemmatizationService) {
    this.lemmatizeService = lemmatizeService;
  }

  async execute(word: Word, userId: UserId): Promise<SentenceList> {
    const sentenceList = await this.lemmatizeService.getSentenceListByWord(
      word,
      userId
    );
    return sentenceList;
  }
}
