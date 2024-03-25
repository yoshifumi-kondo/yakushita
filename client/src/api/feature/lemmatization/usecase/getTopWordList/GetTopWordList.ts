import { UserId } from "@/api/lib/domain";
import { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";
import { IGetTopWordList } from "@/api/feature/lemmatization/usecase/getTopWordList/IGetTopWordList";

export class GetTopWordList implements IGetTopWordList {
  private readonly lemmatizeService: ILemmatizationService;

  constructor(lemmatizeService: ILemmatizationService) {
    this.lemmatizeService = lemmatizeService;
  }

  async execute(userId: UserId) {
    const wordList = await this.lemmatizeService.getTopWords(userId);
    return wordList;
  }
}
