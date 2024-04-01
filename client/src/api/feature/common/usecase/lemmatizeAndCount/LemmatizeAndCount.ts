import type { ILemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/ILemmatizeAndCount";
import type { ILemmatize } from "@/api/feature/lemmatization/usecase/lemmatize/ILemmatize";
import type { ICount } from "@/api/feature/wordUsage/usecase/count/ICount";
import type { Sentence, UserId } from "@/api/lib/domain";

export class LemmatizeAndCount implements ILemmatizeAndCount {
  constructor(
    private readonly lemmatize: ILemmatize,
    private readonly count: ICount
  ) {}
  async execute(userId: UserId, source: Sentence): Promise<void> {
    const lemmatized = await this.lemmatize.execute(userId, source);
    await this.count.execute(lemmatized.userId, lemmatized.wordList);
  }
}
