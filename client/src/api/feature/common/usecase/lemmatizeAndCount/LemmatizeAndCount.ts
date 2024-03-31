import type { ILemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/ILemmatizeAndCount";
import type { ILemmatize } from "@/api/feature/lemmatization/usecase/lemmatize/ILemmatize";
import type { ICountByWordList } from "@/api/feature/wordUsage/usecase/countByWordList/ICountByWordList";
import {
  LanguagesType,
  Language,
  type Sentence,
  type Text,
  type UserId,
} from "@/api/lib/domain";

export class LemmatizeAndCount implements ILemmatizeAndCount {
  constructor(
    private readonly lemmatize: ILemmatize,
    private readonly count: ICountByWordList
  ) {}
  async execute(userId: UserId, source: Sentence): Promise<void> {
    const lemmatizedWordList = await this.lemmatize.execute(userId, source);
    await this.count.execute(userId, lemmatizedWordList.wordList);
  }
}
