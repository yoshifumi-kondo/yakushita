import type { ILemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/ILemmatizeAndCount";
import type { ILemmatize } from "@/api/feature/lemmatization/usecase/lemmatize/ILemmatize";
import type { ICountByWordList } from "@/api/feature/wordUsage/usecase/countByWordList/ICountByWordList";
import type { Language, Text, UserId } from "@/api/lib/domain";

export class LemmatizeAndCount implements ILemmatizeAndCount {
  constructor(
    private readonly lemmatize: ILemmatize,
    private readonly count: ICountByWordList
  ) {}
  async execute(
    userId: UserId,
    language: Language,
    source: Text
  ): Promise<void> {
    const lemmatizedWordList = await this.lemmatize.execute(
      userId,
      language,
      source
    );
    await this.count.execute(userId, lemmatizedWordList.wordList);
  }
}
