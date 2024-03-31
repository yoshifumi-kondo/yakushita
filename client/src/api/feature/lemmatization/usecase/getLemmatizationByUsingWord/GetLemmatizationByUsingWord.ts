import type { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";
import type { IGetLemmatizationByUsingWord } from "@/api/feature/lemmatization/usecase/getLemmatizationByUsingWord/IGetLemmatizationByUsingWord";
import type {
  LemmatizedLemmatizationList,
  UserId,
  Word,
} from "@/api/lib/domain";

export class GetLemmatizationByUsingWord
  implements IGetLemmatizationByUsingWord
{
  constructor(private readonly lemmatizationService: ILemmatizationService) {}
  async execute(
    word: Word,
    userId: UserId
  ): Promise<LemmatizedLemmatizationList> {
    return this.lemmatizationService.getAllLemmatizedByWord(word, userId);
  }
}
